import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import Navbar_Login from "../Components/Navbar_Login";
import "../Components_CSS/Doom_Chatc.css";

// const socket = io("http://localhost:5000");

const UserChat = ({ currentUser }) => {
  const base_URL=import.meta.env.VITE_API_BASE_URL;
  const socketRef = useRef(null);
  const chatBodyRef = useRef(null); // ⬅ New ref for auto-scroll

  useEffect(() => {
    socketRef.current = io(`${base_URL}`);
    return () => socketRef.current.disconnect();
  }, []);

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const doomUsername = "Doom007"; // fixed recipient

  useEffect(() => {
    if (!currentUser) return;

    socketRef.current.emit("register", currentUser);
    socketRef.current.emit("requestHistory", {
      sender: currentUser,
      recipient: doomUsername,
    });

    const handleReceive = (msg) => {
      if (
        (msg.sender === currentUser && msg.recipient === doomUsername) ||
        (msg.sender === doomUsername && msg.recipient === currentUser)
      ) {
        setMessages((prev) => [...prev, msg]);
      }
    };

    const handleHistory = (msgs) => setMessages(msgs);

    socketRef.current.on("receiveMessage", handleReceive);
    socketRef.current.on("chatHistory", handleHistory);

    return () => {
      socketRef.current.off("receiveMessage", handleReceive);
      socketRef.current.off("chatHistory", handleHistory);
    };
  }, [currentUser]);

  // ⬅ Auto-scroll effect
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    socketRef.current.emit("sendMessage", {
      sender: currentUser,
      recipient: doomUsername,
      content: input,
      timestamp: new Date().toISOString(),
    });

    setInput("");
  };

  return (
    <div className="battleworld-wrapper">
      <Navbar_Login />
      <div className="battleworld-container">
        <div className="sidebar">
          <div className="sidebar-header">Chat With</div>
          <div className="user-list">
            <div className="user-item active">Doom</div>
          </div>
        </div>

        <div className="chat">
          <div className="chat-header">
            <div className="chat-user">{doomUsername}</div>
          </div>

          <div className="chat-body" ref={chatBodyRef}>
            {messages.map((m, i) => (
              <div
                key={i}
                className={`chat-msg ${m.sender === currentUser ? "me" : "other"}`}
              >
                <div className="chat-text">{m.content}</div>
                <div className="chat-time">
                  {new Date(m.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="chat-input-bar">
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>➤</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserChat;
