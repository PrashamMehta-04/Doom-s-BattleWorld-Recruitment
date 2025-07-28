import { Routes, Route, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './App.css'
import Home from './Pages/Home'
import Navbar from './Components/Navbar';
import Login from './Pages/Login';
import Sign from './Pages/Sign_Up';
import Home_Logged from './Pages/Home_Logged';
import Doom from './Pages/Doom';
import Job_Post from './Pages/Job_Post';
import Resume from './Pages/Resume';
import Doom_Review from './Pages/Doom_Review';
import Hero_profile from './Pages/hero_profile';
import Job_info from './Pages/Job_info';
import Video_Call_room from './Pages/Video_Call_room';
import Chat from './Pages/Doom_Chat';
import UserChat from './Pages/User_Chat';
import HeroStatus from './Pages/HeroStatus';
import About from './Pages/About';
import PrivacyTerms from './Pages/PrivacyTerms';
import HeroProfileEdit from './Pages/Profile_Edit';
export default function App() {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

useEffect(() => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.log("No token found");
    return;
  }

  fetch('http://localhost:5000/api/current-user', {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
    .then(res => res.json())
    .then(data => {
      console.log("Current user API response:", data);
      setUsername(data.username);
    //   if (data.username === "prashammehta360@gmail.com") {
    //     navigate('/chat'); // Doom_Chat
    //   } else {
    //     navigate('/chat-user'); // User_Chat
    //   }
     })
    .catch(err => {
      console.error("Fetch error:", err);
    });
}, [navigate]);
  return (
    <>
    <img className="bg-Image" src = "./Components_CSS/Bg1.png" alt="Background" />
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/home-Logged" element={<Home_Logged />}/>
          <Route path="/sign-up" element={<Sign />} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/doom" element={<Doom/>}/>
          <Route path="/job" element={<Job_Post/>}/>
          <Route path ='/resume' element={<Resume/>}/>
          <Route path="/doom-review" element={<Doom_Review />} />
          <Route path='/hero-profile' element={<Hero_profile/>}/>
          <Route path='/job-info' element={<Job_info/>}/>
          <Route path='/video-call' element={<Video_Call_room/>}/>
          <Route path='/chat' element={username ? <Chat currentUser={username} /> : <div>Loading...</div>} />
          <Route path="/chat-user" element={username ? <UserChat currentUser={username} /> : <div>Loading...</div>} />
          <Route path='/status' element={<HeroStatus/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/privacy-terms' element={<PrivacyTerms/>}/>
          <Route path='/hero-profile-edit' element={<HeroProfileEdit/>}/>
        </Routes>
      </div>
    </>
  );
}
