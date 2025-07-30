// src/Pages/Login.jsx
import React, { useState } from 'react';
import '../Components_CSS/Loginc.css';
import { useNavigate } from 'react-router-dom';
import {setStoreValue} from 'pulsy';
import { jwtDecode } from 'jwt-decode';

const Doom_Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [nme,setName]=useState('');

  const handleLogin = async(e) =>{
    e.preventDefault();

    // 🔒 Hardcoded credentials (change as needed)
    const validUsername = 'Doom007';
    const validPassword = 'doom@987';

    if (username === validUsername && password === validPassword) {
       const submitNormal=await fetch('http://localhost:5000/api/login',{
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({username,password})
    });
    if(submitNormal.ok){
      const data=await submitNormal.json();
      const token=data.token;
      localStorage.setItem('token', token);
      setStoreValue('auth',{token,user:{username}})
    const n=jwtDecode(token);
    setName(n.name);
   navigate('/doom');
   localStorage.setItem('userName',username); 
   localStorage.setItem('Name',n.name);
   setUsername('');
   setPassword('');
   setName('');
  }
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
