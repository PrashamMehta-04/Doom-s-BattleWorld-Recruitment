import React from 'react';
import '../Components_CSS/Navbarc.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

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
        <Link to="/about">About</Link>
        <Link to="/Privacy-Terms">Privacy/Terms</Link>
        <Link to="/contact">Contact Us</Link>
      </nav>
    </header>
  );
};

export default Navbar;
