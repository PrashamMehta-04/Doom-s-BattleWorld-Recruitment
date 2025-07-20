import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "../Components_CSS/Job_Openingsc.css";

const CurrentOpenings = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/doomOpenings");
        const data = await res.json();
        setJobs(data);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      }
    };

    fetchJobs();
  }, []);

  const handleReview = () => {
    navigate("/doom-review");
  };

  return (
    <div className="openings-container">
      <h2 className="openings-header">Current Openings</h2>
      {jobs.map((job, index) => (
        <div key={index} className="job-card">
          <div className="job-info">
            <h3 className="job-title">{job.companyName}</h3>
            <p className="job-desc">{job.subTitle}</p>
          </div>
          <button className="review-btn" onClick={handleReview}>
            Review
          </button>
        </div>
      ))}
    </div>
  );
};

export default CurrentOpenings;
