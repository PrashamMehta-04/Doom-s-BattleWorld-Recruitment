import React from "react";
import '../Components_CSS/PrivacyTermsc.css';
const PrivacyTerms = () => {
  return (
    <div className="privacy-container">
      <h1 className="privacy-title">Privacy Policy & Terms of Battle</h1>
      <p className="privacy-intro">
        By entering the realm of BattleWorld, you agree to Doom’s eternal wisdom, along with the following terms and conditions.
      </p>

      <div className="privacy-section">
        <h2 className="section-heading">📜 Data Collection</h2>
        <p>
          We collect only the information needed to evaluate your candidacy for interdimensional missions. This includes:
        </p>
        <ul>
          <li>Personal identifiers (name, alias, origin universe)</li>
          <li>Power set, weaknesses, battle history</li>
          <li>Uploaded resumes and battle reports</li>
          <li>Messages and interview availability</li>
        </ul>
      </div>

      <div className="privacy-section">
        <h2 className="section-heading">🛡️ Data Usage</h2>
        <p>Your data is used to:</p>
        <ul>
          <li>Match you with job openings posted by Doom</li>
          <li>Enable real-time chat, interview scheduling, and recruitment processes</li>
          <li>Generate compatibility scores for recruitment optimization</li>
        </ul>
      </div>

      <div className="privacy-section">
        <h2 className="section-heading">🔒 Security</h2>
        <p>
          All portals are encrypted with Stark-level security protocols. Unauthorized access attempts will be met with a
          temporal banishment.
        </p>
      </div>

      <div className="privacy-section">
        <h2 className="section-heading">📬 Communication</h2>
        <p>
          Doom may contact you via in-app messages, summoning emails, or scheduled calls. By using this platform, you consent
          to receive such communications.
        </p>
      </div>

      <div className="privacy-section">
        <h2 className="section-heading">⚖️ Terms of Use</h2>
        <ul>
          <li>Profiles must reflect real powers, achievements, and weaknesses — illusions will be purged.</li>
          <li>All job applications are binding until rejected or withdrawn.</li>
          <li>Doom reserves the right to alter, delete, or exile any user or job posting at will.</li>
        </ul>
      </div>

      <div className="privacy-footer">
        <p><em>Your data. Your destiny. Your Doom.</em></p>
      </div>
    </div>
  );
};

export default PrivacyTerms;
