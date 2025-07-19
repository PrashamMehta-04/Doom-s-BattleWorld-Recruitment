import React from 'react';
import '../Components_CSS/Navbarc.css';
import{useNavigate} from 'react-router-dom';
const Navbar_Login=()=>{
  const navigate=useNavigate();
    return(
        <div>
        <header className="header">
      <div className="logo">
        <span className='logo-icon'>⚡</span>
        <span className="logo-text">BattleWorld</span>
      </div>
      <nav className="nav-links">
        <a onClick={()=>navigate('/home-logged')}href="#">Home</a>
        <a  href="#">Status</a>
        <a onClick={()=>navigate('/hero-profile')} href="#">My Profile</a>
        <button className="button">Logout</button>
      </nav>
    </header> 
        </div>
    );
};
export default Navbar_Login;