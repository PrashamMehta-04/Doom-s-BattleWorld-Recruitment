// src/Pages/Login.jsx
import React, { useState } from 'react';
import '../Components_CSS/Loginc.css';
import { useNavigate } from 'react-router-dom';
import { setStoreValue } from 'pulsy';
import { jwtDecode } from 'jwt-decode';
import Navbar from '../Components/Navbar';
import doom from '../Components_CSS/image.png'
const Doom_Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();
  const [nme, setName] = useState('');
  const [showmsg, setShowMsg] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    // 🔒 Hardcoded credentials (change as needed)
    const validUsername = 'Doom007';
    const validPassword = 'doom@987';

    if (username === validUsername && password === validPassword) {
      const submitNormal = await fetch('http://localhost:5000/api/login', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      if (submitNormal.ok) {
        const data = await submitNormal.json();
        const token = data.token;
        localStorage.setItem('token', token);
        setStoreValue('auth', { token, user: { username } });
        const n = jwtDecode(token);
        setName(n.name);
        localStorage.setItem('userName', username);
        localStorage.setItem('Name', n.name);

        setMsg('✅ Logged in Sucessfullly!');
        setShowMsg(true);
        setTimeout(() => {
          setShowMsg(false);
          navigate('/doom');
        }, 2000);
        setUsername('');
        setPassword('');
        setName('');
      } else {
        setMsg('❌ Invalid username or password');
        setShowMsg(true);
        setTimeout(() => setShowMsg(false), 3000);
      }

    }
  }


  return (
    <div className="login-bg">  
      <Navbar />
     
      <div className="login-glass-card">
        
        <div className="login-logo">
          <span role="img" aria-label="bolt" className="login-bolt">⚡</span>
          <span className="login-title">BattleWorld</span>
        </div>
        <h2>Welcome, Doom!</h2>
        <p className="login-subtitle">Only the worthy may enter.</p>

        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="login-input"
          />
          <button type="submit" className="login-btn">Enter</button>
        </form>
        <div>
          {showmsg && <p className="login-msg">{msg}</p>}
        </div>
      </div>
       
    </div>
    
  );
};

export default Doom_Login;
