import React, { useState, useEffect } from 'react';
import '../Components_CSS/hero_Profile.css';
import { useParams } from 'react-router-dom';
import Profile_SuperPower from '../Components/Profile_SuperPower';
import Navbar_Login from '../Components/Navbar_Login';

const HeroPublicProfile = () => {
  const { username } = useParams();
  const [power, setPower] = useState([]);
  const [story, setStory] = useState('');
  const [weakness, setWeakness] = useState([]);
  const [battles, setBattles] = useState([]);
  const [role, setRole] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchHeroProfile = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/hero-profile/${username}`);
        if (response.ok) {
          const data = await response.json();
          setPower(data.SuperPower.map((i) => <Profile_SuperPower power={i} key={i} />));
          setStory(data.BackStory);
          setWeakness(data.Weakness);
          setBattles(data.keyBattles);
          setRole(data.preferredRole);
          setName(data.Name);
        } else {
          console.log("Hero not found");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchHeroProfile();
  }, [username]);

  return (
    <div className="cq-wrapper">
      <Navbar_Login />
      <div className="cq-container">
        <div className="cq-hero-header">
          <div className="cq-avatar">
            <div className="cq-avatar-icon">⚡</div>
          </div>
          <div className="cq-hero-info">
            <h1 className="cq-name">{name}</h1>
            <p className="cq-username">@{username}</p>
          </div>
        </div>

        <div className="cq-section cq-powers">
          <h2>⚡ Superpowers & Abilities</h2>
          <div className="cq-cards-grid">{power}</div>
        </div>

        <div className="cq-section cq-powers">
          <h2>📖 Origin Story & Backstory</h2>
          <div className="cq-section cq-origin">
            <div className="cq-origin-box">
              <p>{story}</p>
            </div>
          </div>
        </div>

        <div className="cq-section cq-battles">
          <h2 className="cq-section-title">🗡️ Key Battles</h2>
          <ul className="cq-battles-list">
            {battles.map((battle, index) => (
              <li key={index} className="cq-battle-item">
                <strong>{battle}</strong>
              </li>
            ))}
          </ul>
        </div>

        <div className="cq-section cq-powers">
          <h2>❌ Known Weaknesses</h2>
          <div className="cq-section cq-origin">
            <ul className="cq-weakness-list">
              {weakness.map((weak, i) => (
                <li key={i}>
                  <strong>{weak}</strong>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="cq-section cq-preferred-roles">
          <div className="cq-section-title">
            <span className="cq-section-icon">🎯</span>
            Preferred Roles
          </div>
          <div className="cq-featured-role-card">
            <h4>{role}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroPublicProfile;
