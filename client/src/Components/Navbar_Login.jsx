import React from 'react';
import '../Components_CSS/Navbarc.css';
const Navbar_Login=()=>{
    return(
        <div>
        <header className="header">
      <div className="logo">
        <span className='logo-icon'>⚡</span>
        <span className="logo-text">BattleWorld</span>
      </div>
      <nav className="nav-links">
        <a href="#">Home</a>
        <a href="#">Status</a>
        <a href="#">My Profile</a>
        <button className="button">Logout</button>
      </nav>
    </header> 
        </div>
    );
};
export default Navbar_Login;