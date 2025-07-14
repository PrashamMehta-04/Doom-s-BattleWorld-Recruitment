import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import '../Components_CSS/Loginc.css';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName]=useState('');
  const [type,setType]=useState('');
  const navigate =useNavigate();
  const handleFormSubmit = async(e)=> {
    e.preventDefault();
    try{
    const submitNormal=await fetch('http://localhost:5000/api/login',{
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({username,password})
    });
    if(submitNormal.ok){
   navigate('./Home_Logged');
   localStorage.setItem('userName',username); 
   localStorage.setItem('Name',name);
   setUsername('');
   setPassword('');
   setName('');
  }
  else if(submitNormal.status==401){
    console.log("Password and Username do not match!");
  }
  else{
    console.log("Server Error");
  }
  }
  catch(error){
    console.error("Error", error);
  }
     console.log('Email:', username, 'Password:', password);
  };
    // handle email/password login here const submitGoogle =async (e)=>{
      const submitGoogle=async (credentialResponse)=>{
      const decode=jwtDecode(credentialResponse.credential);

      try{
        const response=await fetch("http://localhost:5000/api/google",{
          method:"POST",
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({username:decode.email,password:null,name:decode.name,type:"google"})
        });
        if(response.ok){
          navigate('./Home_logged');
          localStorage.setItem('userName',decode.email); 
          localStorage.setItem('Name',decode.name);
          setUsername('');
          setPassword('');
          setName('');
          console.log("Logged in Successfully");
        }
        else{
          console.log("Error logging in");
        }
      }
      catch(error){
        console.log("Error logging in!");
      }
    }

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
          <button type="submit" className="login-btn">Sign In</button>
        </form>
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