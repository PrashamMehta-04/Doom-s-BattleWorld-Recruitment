import React from 'react';
import {
  FaBriefcase,
  FaUsers,
  FaUserCheck,
  FaComments
} from 'react-icons/fa';
import '../Components_CSS/Doom_Welcomec.css';
import CurrentOpenings from './Job_Openings';

const Welcome = ({ name, stats }) => {
  const { activePositions, totalApplicants, shortlisted, activeChats } = stats;

  return (
    <>
      <div className="wel">
        <h1>Welcome Back, {name}!</h1>

        <div className="stats-container">
          <div className="stat-box box-blue">
            <FaBriefcase className="stat-icon" />
            <h2>{activePositions}</h2>
            <p>Active Positions</p>
          </div>
          <div className="stat-box box-purple">
            <FaUsers className="stat-icon" />
            <h2>{totalApplicants}</h2>
            <p>Total Applicants</p>
          </div>
          <div className="stat-box box-yellow">
            <FaUserCheck className="stat-icon" />
            <h2>{shortlisted}</h2>
            <p>Shortlisted</p>
          </div>
          <div className="stat-box box-pink">
            <FaComments className="stat-icon" />
            <h2>{activeChats}</h2>
            <p>Active Chats</p>
          </div>
        </div>

        <div className="action-buttons">
          <button className="action-btn red">Post New Position</button>
          <button className="action-btn blue">Review Applications</button>
          <button className="action-btn purple">Manage Communications</button>
        </div>
      </div>
      <div>
        <CurrentOpenings />
      </div>
    </>
  );
};

export default Welcome;
