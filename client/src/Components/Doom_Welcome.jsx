import React,{useState} from 'react';
import {
  FaBriefcase,
  FaUsers,
  FaUserCheck,
  FaComments
} from 'react-icons/fa';
import '../Components_CSS/Doom_Welcomec.css';
import CurrentOpenings from './Job_Openings';
import { useNavigate } from 'react-router-dom';

const Welcome = ({ name, stats }) => {
  const { activePositions, totalApplicants, shortlisted} = stats;
  
  const navigate = useNavigate();

  return (
    <>
      <div className="welcome-container">
        <h1 className="welcome-heading">Welcome Back, {name}!</h1>

        <div className="stats-grid">
          <div className="stat-card stat-blue">
            <FaBriefcase className="stat-icon" />
            <h2>{activePositions}</h2>
            <p>Active Positions</p>
          </div>
          <div className="stat-card stat-purple">
            <FaUsers className="stat-icon" />
            <h2>{totalApplicants}</h2>
            <p>Reviews Pending</p>
          </div>
          <div className="stat-card stat-yellow">
            <FaUserCheck className="stat-icon" />
            <h2>{shortlisted}</h2>
            <p>Shortlisted</p>
          </div>
        </div>

        <div className="button-row">
          <button className="action-btn red" onClick={() => navigate('/job')}>
            Post New Position
          </button>
          <button className="action-btn purple" onClick={() => navigate('/chat')}>
            Manage Communications
          </button>
        </div>
      </div>
    <div>
     
    </div>
      <div>
        <CurrentOpenings />
      </div>
    </>
  );
};

export default Welcome;
