import React from 'react';
import '../Components_CSS/Navbarc.css';
import {setStoreValue} from 'pulsy';
import {useNavigate} from 'react-router-dom';
const Navbar_Login=()=>{
  const navigate=useNavigate();
   const logout=()=>{
    setStoreValue('auth',{token:null,user:null});
    localStorage.removeItem('token');
    localStorage.clear();
    navigate('/');
  }
    return(
        <div>
        <header className="header">
      <div className="logo">
        <span className='logo-icon'>⚡</span>
        <span className="logo-text">BattleWorld</span>
      </div>
      <nav className="nav-links">
        <a onClick={()=>navigate('/doom')}href="">Home</a>
        <a href="">My Profile</a>
        <button className="button" onClick={logout}>Logout</button>
      </nav>
    </header> 
        </div>
    );
};

export default Navbar_Login;