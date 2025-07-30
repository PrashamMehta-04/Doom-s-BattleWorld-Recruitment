import React from 'react';
import '../Components_CSS/Welcome.css';

const Welcome = ({ name, jobs, availableJobs }) => {
  return (
    <div className="wel">
      <div className="welcome-section">
        <div className="welcome-heading">Welcome Back, {name}!</div>
        <p className="welcome-subtext">The multiverse awaits your next battle</p>
      </div>

      <div className="stat">
        <h1>{jobs}</h1>
        <p>Open Jobs</p>
      </div>
      <div className="stat">
        <h1>{availableJobs}</h1>
        <p>Available Jobs</p>
      </div>
    </div>
  );
};

export default Welcome;
