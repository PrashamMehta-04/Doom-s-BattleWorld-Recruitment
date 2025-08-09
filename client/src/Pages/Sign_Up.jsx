import React, { useState } from 'react';
import '../Components_CSS/Loginc.css';
import { GoogleLogin } from '@react-oauth/google';
import {useNavigate} from 'react-router-dom';
import Navbar from '../Components/Navbar';


const Sign_Up = () => {
  const base_URL=import.meta.env.VITE_API_BASE_URL;
  const [msg, setMsg] = useState('');
  const [showmsg, setShowMsg] = useState(false);
  const navigate=useNavigate();
  const [form, setForm] = useState({
    name: '',
    username: '',
    password: '',
    confirmPassword: '',
    Email: ''
  });
  const[type,setType]=useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(form.confirmPassword!=form.password){
      console.log("Password and Confirm Password don't match!");
    }
    else{
    // handle sign up logic here
    try{
      const username=form.username;
      const password=form.password;
      const name=form.name;
    const response=await fetch(`${base_URL}/api/signup`,{
      method:"POST",
      headers:{
      'Content-Type':'application/json'
      },
      body:JSON.stringify({username,password,name,type:'manual',Email:form.Email})
    });
    if(response.ok){
      setMsg('✅ Profile created Successfully!');
      setShowMsg(true);
        setTimeout(() => {
          setShowMsg(false);
          navigate('/login');
        }, 2000);
      localStorage.setItem('Name',name);
      localStorage.setItem('userName',username);
      setForm.username='';
      setForm.name='';
      setForm.password='';
      setForm.confirmPassword='';
      setForm.Email='';
    }
    else if(response.status==401){
      setMsg('❌ Password and Confirm Password does not match!');
        setShowMsg(true);
        setTimeout(() => setShowMsg(false), 3000);
      console.log("Password and Confirm password does not match!");
    }
    else{
      console.log('Error Connecting to the Server!');
    }
    }
    catch(error){
      console.error("Error fetching",error);
    }
  }
    console.log(form);
  };

  return (
    <div className="login-bg">
      <Navbar/>
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
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
            className="login-input"
          />
            <input
            type="email"
            name="Email"
            placeholder="Email ID"
            value={form.Email}
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
          {/* <input
            type="text"
            name="superPower"
            placeholder="SuperPower"
            value={form.superPower}
            onChange={handleChange}
            required
            className="login-input"
          /> */}
          <button type="submit" className="login-btn">Sign Up</button>
        </form>
        <div>
          {msg && <p className="login-msg">{msg}</p>}
        </div>
        {/* <div className="login-google-btn">
          <GoogleLogin
            onSuccess={credentialResponse => {
              console.log(credentialResponse);
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          />
        </div> */}
      </div>
    </div>
    
  );
};

export default Sign_Up;