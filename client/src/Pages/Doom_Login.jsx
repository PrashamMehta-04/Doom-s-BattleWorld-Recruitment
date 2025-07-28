// src/Pages/Login.jsx
import React, { useState } from 'react';
import '../Components_CSS/Loginc.css';
import { useNavigate } from 'react-router-dom';

const Doom_Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // 🔒 Hardcoded credentials (change as needed)
    const validUsername = 'Doom007';
    const validPassword = 'doom@987';

    if (username === validUsername && password === validPassword) {
      console.log('Login successful');
      navigate('/doom');
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <div className="login-bg">
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
      </div>
    </div>
  );
};

export default Doom_Login;
