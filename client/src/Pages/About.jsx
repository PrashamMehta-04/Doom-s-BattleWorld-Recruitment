import React from "react";
import '../Components_CSS/Aboutc.css';
import Navbar from "../Components/Navbar";
const About = () => {
  return (
    <div className="about-container">
      <Navbar/>
      <h1 className="about-title">What is BattleWorld?</h1>
      <p className="about-description">
        BattleWorld is a multiversal recruitment arena built by Doom himself — designed to match elite heroes and villains
        with universe-defining missions. Whether you’re a resurrected celestial or a rogue sorcerer looking for your next
        conquest, this platform connects you to opportunities beyond your realm.
      </p>

      <div className="about-section">
        <h2 className="section-title">🦸 For Marvel Heroes</h2>
        <ul className="about-list">
          <li><strong>Create your heroic profile</strong> – Showcase your backstory, powers, and legendary battles.</li>
          <li><strong>Apply to multiversal job postings</strong> – Find roles that match your abilities across timelines.</li>
          <li><strong>Chat directly with Doom</strong> – Get shortlisted through a swipe-based interface and initiate live communication.</li>
          <li><strong>Schedule interdimensional interviews</strong> – Choose your availability and get summoned accordingly.</li>
        </ul>
      </div>

      <div className="about-section">
        <h2 className="section-title">🧠 For Doom (Recruiter)</h2>
        <ul className="about-list">
          <li><strong>Post roles and missions</strong> – Define the next battlefront and requirements.</li>
          <li><strong>Swipe through candidates</strong> – Reject, shortlist, save, or like with a simple gesture.</li>
          <li><strong>Engage via chat or calls</strong> – Schedule interviews and send official summons via email.</li>
        </ul>
      </div>

      <div className="about-footer">
        <p>Forged in code. Fueled by Doom’s ambition. Built for the multiverse.</p>
        <p><em>BattleWorld Awaits You.</em></p>
      </div>
    </div>
  );
};

export default About;
