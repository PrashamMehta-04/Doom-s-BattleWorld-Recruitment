import React from 'react';
import '../Components_CSS/Navbarc.css';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className="custom-navbar">
      <div className="custom-logo-section">
        <span className="custom-logo-icon">⚡</span>
        <span 
          className="custom-logo-text" 
          onClick={() => navigate('/')} 
          style={{ cursor: 'pointer' }}
        >
          BattleWorld
        </span>
      </div>

      <nav className="custom-nav-links">
        <a onClick={() => navigate('/about')} href="#">About</a>
        <a onClick={() => navigate('/Privacy-Terms')} href="#">Privacy/Terms</a>
        <a onClick={() => navigate('/contact')} href="#">Contact Us</a>
      </nav>
    </header>
  );
};

export default Navbar;
