import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import Navbar from './Components/Navbar';

export default function App() {
  return (
    <>
    <img className="bg-Image" src = "./Components_CSS/Bg1.png" alt="Background" />
      <Navbar />
      <div style={{ marginTop: '10px' }}>
        <Routes>
//         <Route path="/" element={<Home />} />
       </Routes>
      </div>
    </>
  );
}
