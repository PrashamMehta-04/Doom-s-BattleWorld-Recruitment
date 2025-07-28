import React from "react";
import Navbar_Login from "../Components/Navbar_Login";
import "../Components_CSS/PrivacyTermsc.css"; // Reusing the privacy theme

const Contact = () => {
  return (
    <div className="privacy-container">
      <Navbar_Login />
      <h1 className="privacy-title">📞 Contact Us</h1>
      <p className="privacy-intro">
        Whether you're a hero in need of assistance, a recruiter looking for top talent, or just want to say hello — we're here for you!
      </p>

      <div className="privacy-section">
        <h2 className="section-heading">🌐 Headquarters</h2>
        <p>BattleWorld HQ, Sector 7, Neo-Mumbai, India - 400076</p>
      </div>

      <div className="privacy-section">
        <h2 className="section-heading">📬 Email</h2>
        <p>
          For general queries: <a href="mailto:support@battleworld.com">support@battleworld.com</a><br />
          For partnerships: <a href="mailto:partners@battleworld.com">partners@battleworld.com</a>
        </p>
      </div>

      <div className="privacy-section">
        <h2 className="section-heading">📱 Connect With Us</h2>
        <ul>
          <li>Twitter: <a href="https://twitter.com/battleworld" target="_blank" rel="noopener noreferrer">@battleworld</a></li>
          <li>Instagram: <a href="https://instagram.com/battleworld" target="_blank" rel="noopener noreferrer">@battleworld</a></li>
          <li>LinkedIn: <a href="https://linkedin.com/company/battleworld" target="_blank" rel="noopener noreferrer">BattleWorld Corp</a></li>
        </ul>
      </div>

      <div className="privacy-footer">
        © 2025 BattleWorld. Forging Futures, One Hero at a Time.
      </div>
    </div>
  );
};

export default Contact;
