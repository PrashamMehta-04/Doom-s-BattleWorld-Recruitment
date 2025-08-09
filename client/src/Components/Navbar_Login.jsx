import React, { useState } from 'react';
import '../Components_CSS/Navbarc.css';
import { useNavigate } from 'react-router-dom';
import { setStoreValue } from 'pulsy';  

const Navbar_Login = () => {
  const [msg, setMsg] = useState('');
  const [showMsg, setShowMsg] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    setStoreValue('auth', { token: null, user: null });
    localStorage.removeItem('token');
    localStorage.clear();

    setMsg('✅ Logged Out Successfully!');
    setShowMsg(true);

    setTimeout(() => {
      setShowMsg(false);
      navigate('/');
    }, 2000);
  };

  return (
    <header className="custom-navbar">
      {showMsg && <p className="custom-login-msg">{msg}</p>}

      <div className="custom-logo-section">
        <span className="custom-logo-icon">⚡</span>
        <span className="custom-logo-text">BattleWorld</span>
      </div>

      <nav className="custom-nav-links">
        <a onClick={() => navigate('/home-logged')} href="#">Home</a>
        <a onClick={() => navigate('/status')} href="#">Status</a>
        <a onClick={() => navigate('/hero-profile')} href="#">My Profile</a>
        <button className="custom-logout-btn" onClick={logout}>Logout</button>
      </nav>
    </header>
  );
};

export default Navbar_Login;
