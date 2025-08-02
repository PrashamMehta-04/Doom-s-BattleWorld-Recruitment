import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import Navbar_Login from "../Components/Doom_Navbar";
import "../Components_CSS/Doom_Chatc.css";
import { useNavigate } from 'react-router-dom';

// const socket = io("http://localhost:5000");


const Chat = ({ currentUser }) => {
  const socketRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    socketRef.current = io("http://localhost:5000");
    return () => socketRef.current.disconnect();
  }, []);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [recipient, setRecipient] = useState(null);
  const [email, setEmail] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // const token =
  useEffect(() => {
    if (currentUser) {
      // socket.emit("register", currentUser);
      socketRef.current.emit("register", currentUser);
    }
    fetch("http://localhost:5000/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data.filter((u) => u.username !== currentUser)));
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser) return;
    // socket.emit("register", currentUser);
    socketRef.current.emit("register", currentUser);

    const handleReceive = (msg) => {
      if (
        (msg.sender === currentUser && msg.recipient === recipient) ||
        (msg.sender === recipient && msg.recipient === currentUser)
      ) {
        setMessages((prev) => [...prev, msg]);
      }
    };

    // socket.on("receiveMessage", handleReceive);
    socketRef.current.on("receiveMessage", handleReceive);

    return () => {
      // socket.off("receiveMessage", handleReceive);
      socketRef.current.off("receiveMessage", handleReceive);
    };
  }, [currentUser, recipient]);

  useEffect(() => {
    if (recipient) {
      // socket.emit("requestHistory", { sender: currentUser, recipient });
      socketRef.current.emit("requestHistory", { sender: currentUser, recipient });
    }

    const handleHistory = (msgs) => setMessages(msgs);
    // socket.on("chatHistory", handleHistory);
    socketRef.current.on("chatHistory", handleHistory);
    const fetchEmail = async () => {
      console.log(recipient);
      const response = await fetch('http://localhost:5000/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ recipient })
      });
      if (response.ok) {
        const data = await response.json();
        setEmail(data.email);
      }
    };
    fetchEmail();
    return () => {
      // socket.off("chatHistory", handleHistory);
      socketRef.current.off("chatHistory", handleHistory);
    };

  }, [recipient, currentUser]);



  const sendMessage = () => {
    if (!input.trim() || !recipient) return;
    // socket.emit("sendMessage", {
    //   sender: currentUser,
    //   recipient,
    //   content: input,
    //   timestamp: new Date().toISOString(),
    // });
    socketRef.current.emit("sendMessage", {
      sender: currentUser,
      recipient,
      content: input,
      timestamp: new Date().toISOString(),
    });
    setInput("");
  };
  const videoRef = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/video-call', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ recipient, to: email, subject: "Interview Video Call", text: `Hello ${recipient},\n\nYou have a video call scheduled for an interview with Doom's BattleWorld. Please join the call right now.\n\nBest regards,\nDoom's BattleWorld Team ` })
      });
      if (response.ok) {
        navigate('/video-call');
      }
      else {
        console.log("Server Error");
      }
    }
    catch (error) {
      console.error("Failed!!!!", error);
    }
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="user-list">
            {filteredUsers.map((u) => (
              <div
                key={u.username}
                className={`user-item ${recipient === u.username ? "active" : ""}`}
                onClick={() => setRecipient(u.username)}
              >
                {u.username}
              </div>
            ))}
          </div>


          {/* <div className="user-list">
            {users.map((u) => (
              <div
                key={u.username}
                className={`user-item ${recipient === u.username ? "active" : ""}`}
                onClick={() => setRecipient(u.username)}
              >
                {u.username}
              </div>
            ))}

          </div> */}
        </div>

        <div className="chat">
          {recipient ? (
            <>
              <div className="chat-header">
                {/* <div className="chat-user">{recipient}</div> */}
                <div
                  className="chat-user"
                  style={{ cursor: "pointer", textDecoration: "underline" }}
                  onClick={() => navigate(`/hero-profile/${recipient}`)}
                >
                  {recipient}
                </div>

                <div className="chat-status">Online</div>
              </div>

              <div className="chat-body">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`chat-msg ${m.sender === currentUser ? "me" : "other"
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
                <button onClick={videoRef}><svg xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-video">
                  <path d="M22 8L16 12L22 16V8Z" />
                  <rect x="2" y="6" width="14" height="12" rx="2" ry="2" />
                </svg>
                </button>
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