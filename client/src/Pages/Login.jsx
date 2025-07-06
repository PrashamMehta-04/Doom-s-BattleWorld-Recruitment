import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import '../Components_CSS/Loginc.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // handle email/password login here
    console.log('Email:', email, 'Password:', password);
  };

  return (
    <div className="login-bg">
      <div className="login-glass-card">
        <div className="login-logo">
          <span role="img" aria-label="bolt" className="login-bolt">⚡</span>
          <span className="login-title">BattleWorld</span>
        </div>
        <h2>Welcome, Hero!</h2>
        <p className="login-subtitle">Sign in to unlock your multiversal destiny</p>
        <form className="login-form" onSubmit={handleFormSubmit}>
          <input
            type="email"
            placeholder="Email ID"
            value={email}
            onChange={e => setEmail(e.target.value)}
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
          <button type="submit" className="login-btn">Sign In</button>
        </form>
        <h4>New to BattleWorld? <a href="/sign-up">Create account</a></h4>
        <div className="login-google-btn">
          <GoogleLogin
            onSuccess={credentialResponse => {
              // handle login success
              console.log(credentialResponse);
            }}
            onError={() => {
              // handle login error
              console.log('Login Failed');
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;