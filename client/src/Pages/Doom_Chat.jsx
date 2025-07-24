import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import Navbar_Login from "../Components/Doom_Navbar";
import "../Components_CSS/Doom_Chatc.css";

const socket = io("http://localhost:5000");

const Chat = ({ currentUser }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [recipient, setRecipient] = useState(null);

  useEffect(() => {
    if (currentUser) {
      socket.emit("register", currentUser);
    }
    fetch("http://localhost:5000/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data.filter((u) => u.username !== currentUser)));
  }, [currentUser]);

  useEffect(() => {
    if (recipient) {
      socket.emit("requestHistory", { sender: currentUser, recipient });
      socket.on("chatHistory", (msgs) => setMessages(msgs));
    }

    const handleReceive = (msg) => {
      if (
        (msg.sender === currentUser && msg.recipient === recipient) ||
        (msg.sender === recipient && msg.recipient === currentUser)
      ) {
        setMessages((prev) => [...prev, msg]);
      }
    };
    socket.on("receiveMessage", handleReceive);

    return () => {
      socket.off("chatHistory");
      socket.off("receiveMessage", handleReceive);
    };
  }, [recipient, currentUser]);

  
  const sendMessage = () => {
    if (!input.trim() || !recipient) return;
    socket.emit("sendMessage", {
      sender: currentUser,
      recipient,
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
          <div className="sidebar-header">Users</div>
          <input
            type="text"
            className="search-input"
            placeholder="Search users..."
          />
          <div className="user-list">
            {users.map((u) => (
              <div
                key={u.username}
                className={`user-item ${recipient === u.username ? "active" : ""}`}
                onClick={() => setRecipient(u.username)}
              >
                {u.username}
              </div>
            ))}
          </div>
        </div>

        <div className="chat">
          {recipient ? (
            <>
              <div className="chat-header">
                <div className="chat-user">{recipient}</div>
                <div className="chat-status">Online</div>
              </div>

              <div className="chat-body">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`chat-msg ${
                      m.sender === currentUser ? "me" : "other"
                    }`}
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
            </>
          ) : (
            <div className="chat-placeholder">Select a user to start chatting</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;