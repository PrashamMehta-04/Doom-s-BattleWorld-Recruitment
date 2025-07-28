import React from 'react';
import '../Components_CSS/Navbarc.css';
import {useNavigate} from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <header className="header">
      <div className="logo">
        <span className='logo-icon'>⚡</span>
        <span className="logo-text" onClick={()=>navigate('/')} href="">BattleWorld</span>
      </div>
      <nav className="nav-links">
        <a onClick={() => navigate('/about')} href="">About</a>
        <a onClick={() => navigate('/Privacy-Terms')} href="">Privacy/Terms</a>
        <a href="">Contact Us</a>
      </nav>
    </header>
  );
};

export default Navbar;
