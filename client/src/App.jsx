import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import Navbar from './Components/Navbar';
import Login from './Pages/Login';
import Sign from './Pages/Sign_Up';
import Home_Logged from './Pages/Home_Logged';
import Doom from './Pages/Doom';
import Resume from './Pages/Resume';
export default function App() {
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
          <Route path ='/resume' element={<Resume/>}/>
        </Routes>
      </div>
    </>
  );
}
