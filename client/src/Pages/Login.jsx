import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import '../Components_CSS/Loginc.css';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { setStoreValue } from 'pulsy';
import Navbar from '../Components/Navbar';
import { Link } from 'react-router-dom';
const Login = () => {
  const base_URL=import.meta.env.VITE_API_BASE_URL;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [msg, setMsg] = useState('');
  const [showmsg, setShowMsg] = useState(false);
  const [success,setSuccess]=useState('');
  const navigate = useNavigate();
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitNormal = await fetch(`${base_URL}/api/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      if (submitNormal.ok) {
        setSuccess('✅ Logged in Sucessfully!');
        setShowMsg(true);
        setTimeout(() => {
          setShowMsg(false);
          <Link to="/home-logged" />;
          // navigate('/home-logged');
        }, 2000);
        const data = await submitNormal.json();
        const token = data.token;
        localStorage.setItem('token', token);
        setStoreValue('auth', { token, user: { username } })
        const n = jwtDecode(token);
        setName(n.name);
        console.log(n.name);
        localStorage.setItem('userName', username);
        localStorage.setItem('Name', n.name);
        setUsername('');
        setPassword('');
        setName('');
      }
      else if (submitNormal.status == 401) {
        setMsg('Invalid username or password');
        setUsername('');
        setPassword('');
        console.log("Password and Username do not match!");
      }
      else {
        setMsg('Invalid username or password!');
        setUsername('');
        setPassword('');
        console.log("Server Error");
      }
    }
    catch (error) {
      console.error("Error", error);
    }

    
  };
  // handle email/password login here const submitGoogle =async (e)=>{
  const submitGoogle = async (credentialResponse) => {
    const decode = jwtDecode(credentialResponse.credential);


    try {
      const response = await fetch(`${base_URL}/api/google`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: decode.email, password: null, name: decode.name, type: "google" })
      });
      if (response.ok) {
        setSuccess('✅ Logged in Sucessfully!');
        setShowMsg(true);
        setTimeout(() => {
          setShowMsg(false);
          // navigate('/home-logged');
          <Link to="/home-logged" />;
        }, 2000);
        const data = await response.json();
        const token = data.token;
        localStorage.setItem('token', token);
        setStoreValue('auth', { token, user: { username } })
        const n = jwtDecode(token);
        setName(n.name);
        localStorage.setItem('userName', username);
        localStorage.setItem('Name', n.name);
        setUsername('');
        setPassword('');
        setName('');
        console.log("Logged in Successfully");
        console.log(base_URL);
      }
      else {
        setMsg('Invalid username or password!');
        console.log("Error logging in");
      }
    }
    catch (error) {
      console.log("Error logging in!", error);
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
        <h2>Welcome, Hero!</h2>
        <p className="login-subtitle">Sign in to unlock your multiversal destiny</p>
        <form className="login-form" onSubmit={handleFormSubmit}>
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
          <div style={{color:"red"}}>{msg}</div>
          <button type="submit" className="login-btn">Sign In</button>
        </form>
        <div>
            {success && <p className="login-msg">{success}</p>}
          </div>
        <h4>New to BattleWorld? <a href="/sign-up">Create account</a></h4>
        <div className="login-google-btn">
          <GoogleLogin
            onSuccess={submitGoogle}
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