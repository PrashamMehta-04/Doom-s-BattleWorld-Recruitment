import React from 'react';
import '../Components_CSS/Navbarc.css';

const Navbar = () => {
  return (
    <header className="header">
      <div className="logo">
        <span className='logo-icon'>⚡</span>
        <span className="logo-text">BattleWorld</span>
      </div>
      <nav className="nav-links">
        <a href="#">About</a>
        <a href="#">Privacy/Terms</a>
        <a href="#">Contact Us</a>
      </nav>
    </header>
  );
};

export default Navbar;
