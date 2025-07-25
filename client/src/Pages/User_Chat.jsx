import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import Navbar_Login from "../Components/Doom_Navbar";
import "../Components_CSS/Doom_Chatc.css";

const socket = io("http://localhost:5000");



const UserChat = ({ currentUser }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const doomUsername = "prashammehta360@gmail.com"; // fixed recipient

  useEffect(() => {
    if (currentUser) {
      socket.emit("register", currentUser);
      socket.emit("requestHistory", { sender: currentUser, recipient: doomUsername });
    }

    const handleReceive = (msg) => {
      if (
        (msg.sender === currentUser && msg.recipient === doomUsername) ||
        (msg.sender === doomUsername && msg.recipient === currentUser)
      ) {
        setMessages((prev) => [...prev, msg]);
      }
    };

    socket.on("chatHistory", (msgs) => setMessages(msgs));
    socket.on("receiveMessage", handleReceive);

    return () => {
      socket.off("chatHistory");
      socket.off("receiveMessage", handleReceive);
    };
  }, [currentUser]);

  const sendMessage = () => {
    if (!input.trim()) return;

    socket.emit("sendMessage", {
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
            <div className="chat-status">Online</div>
          </div>

          <div className="chat-body">
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
