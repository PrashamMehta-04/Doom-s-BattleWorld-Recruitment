import React, {useState} from 'react';
import '../Components_CSS/Navbarc.css';
import{useNavigate} from 'react-router-dom';
import {setStoreValue} from 'pulsy';  
const Navbar_Login=()=>{
  const [Msg,setMsg]=useState('');
  const [showMsg,setShowMsg]=useState('');
  const navigate=useNavigate();
  const logout=()=>{
    setStoreValue('auth',{token:null,user:null});
    localStorage.removeItem('token');
    localStorage.clear();
   setMsg('✅ Logged Out Successfully!');
   setShowMsg(true); 
    setTimeout(() => {
          setShowMsg(false);
          navigate('/');
        }, 2000);
  }
    return(
        <div className="navbar-main">
        <header className="header">
          <div>
            {Msg && <p className="login-msg">{Msg}</p>}
          </div>
      <div className="logo">
        <span className='logo-icon'>⚡</span>
        <span className="logo-text">BattleWorld</span>
      </div>
      <nav className="nav-links">
        <a onClick={()=>navigate('/home-logged')}href="">Home</a>
        <a  onClick={()=>navigate('/status')} href="">Status</a>
        <a onClick={()=>navigate('/hero-profile')} href="">My Profile</a>
        <button className="button" onClick={logout}>Logout</button>
      </nav>
    </header> 
        </div>
    );
};
export default Navbar_Login;