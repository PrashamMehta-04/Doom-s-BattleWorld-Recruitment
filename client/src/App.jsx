import { Routes, Route } from 'react-router-dom'
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
export default function App() {
  const [username, setUsername] = useState('');

  useEffect(() => {
  fetch('http://localhost:5000/api/users')
    .then(res => res.json())
    .then(data => {
      // For demo: use the first user as current user
      if (data.length > 0) setUsername(data[0].username);
    });
}, []);
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
        </Routes>
      </div>
    </>
  );
}
