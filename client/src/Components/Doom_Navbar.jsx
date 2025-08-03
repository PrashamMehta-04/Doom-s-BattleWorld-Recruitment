import React, {useState} from 'react';
import '../Components_CSS/Navbarc.css';
import {setStoreValue} from 'pulsy';
import {useNavigate} from 'react-router-dom';
const Navbar_Login=()=>{
  const [success,setSuccess]=useState();
  const [showMessage,setShowMessage]=useState(false);
  const navigate=useNavigate();
   const logout=()=>{
    setShowMessage(true);
    setSuccess("✅ Logged Out Successfully!!");
    setStoreValue('auth',{token:null,user:null});
    localStorage.removeItem('token');
    localStorage.clear();
    setTimeout(() => {
          setShowMessage(false);
          navigate('/');
        }, 2000);
    
  }
    return(
        <div>
        <header className="header">
          <div>
            {success && <p className="login-msg">{success}</p>}
          </div>
      <div className="logo">
        <span className='logo-icon'>⚡</span>
        <span className="logo-text">BattleWorld</span>
      </div>
      <nav className="nav-links">
        <a onClick={()=>navigate('/doom')}href="">Home</a>
        <button className="button" onClick={logout}>Logout</button>
      </nav>
    </header> 
        </div>
    );
};

export default Navbar_Login;