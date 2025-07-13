import React from "react";
import "../Components_CSS/Job_Openingsc.css";
const jobList = [
  {
    title: "BattleWorld Tactician",
    description: "Lead strategic assaults against multiversal threats",
    applicants: 15,
  },
  {
    title: "Dimensional Guardian",
    description: "Protect Doom's realm from interdimensional invaders",
    applicants: 23,
  },
  {
    title: "Elite Enforcer",
    description: "Eliminate anomalies with extreme prejudice",
    applicants: 11,
  },
];

const CurrentOpenings = () => {
  return (
    <div className="openings-container">
      <h2 className="openings-header">Current Openings</h2>
      {jobList.map((job, index) => (
        <div key={index} className="job-card">
          <div className="job-info">
            <h3 className="job-title">{job.title}</h3>
            <p className="job-desc">{job.description}</p>
            <span className="applicant-tag">
              {job.applicants} Applicants
            </span>
          </div>
          <button className="review-btn">Review</button>
        </div>
      ))}
    </div>
  );
};
export default CurrentOpenings;
