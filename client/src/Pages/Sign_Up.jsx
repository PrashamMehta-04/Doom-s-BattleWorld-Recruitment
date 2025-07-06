import React, { useState } from 'react';
import '../Components_CSS/Loginc.css';
import { GoogleLogin } from '@react-oauth/google';

const Sign_Up = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    superPower: ''
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // handle sign up logic here
    console.log(form);
  };

  return (
    <div className="login-bg">
      <div className="login-glass-card">
        <div className="login-logo">
          <span role="img" aria-label="bolt" className="login-bolt">⚡</span>
          <span className="login-title">BattleWorld</span>
        </div>
        <h2>Sign Up, Hero!</h2>
        <p className="login-subtitle">Create your account to join the multiverse</p>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
            className="login-input"
          />
          <input
            type="email"
            name="email"
            placeholder="Email ID"
            value={form.email}
            onChange={handleChange}
            required
            className="login-input"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="login-input"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            className="login-input"
          />
          <input
            type="text"
            name="superPower"
            placeholder="SuperPower"
            value={form.superPower}
            onChange={handleChange}
            required
            className="login-input"
          />
          <button type="submit" className="login-btn">Sign Up</button>
        </form>
        <div className="login-google-btn">
          <GoogleLogin
            onSuccess={credentialResponse => {
              console.log(credentialResponse);
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          />
        </div>
      </div>
    </div>
    
  );
};

export default Sign_Up;