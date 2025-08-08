import React, { useState } from 'react';
import '../Components_CSS/Navbarc.css';
import { setStoreValue } from 'pulsy';
import { useNavigate } from 'react-router-dom';

const Navbar_Login = () => {
  const [success, setSuccess] = useState();
  const navigate = useNavigate();

  const logout = () => {
    setSuccess("✅ Logged Out Successfully!!");
    setStoreValue('auth', { token: null, user: null });
    localStorage.removeItem('token');
    localStorage.clear();
    setTimeout(() => {
      setSuccess(null);
      navigate('/');
    }, 2000);
  };

  return (
    <header className="custom-navbar">
      <div className="custom-logo-section">
        <span className="custom-logo-icon">⚡</span>
        <span className="custom-logo-text">BattleWorld</span>
      </div>

      <nav className="custom-nav-links">
        <a onClick={() => navigate('/doom')} href="#">Home</a>
        <button className="custom-logout-btn" onClick={logout}>Logout</button>
      </nav>

      {success && <p className="custom-login-msg">{success}</p>}
    </header>
  );
};

export default Navbar_Login;
