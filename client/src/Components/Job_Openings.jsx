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

  const handleReview = (title) => {
    localStorage.setItem('Title',title);
    navigate("/doom-review");
  };
  const handleEndPosting=async(title)=>{
    const response=await fetch("http://localhost:5000/api/delete-post",{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify({title})
    });
    if(response.ok){
      window.location.reload();
      console.log("Job Posting Ended Successfully!");
      setJobs(jobs.filter(job => job.companyName !== title));
    }

  }

  return (
    <div className="openings-container">
      <h2 className="openings-header">Current Openings</h2>
      {jobs.map((job, index) => (
        <div key={index} className="job-card">
          <div className="job-info">
            <h3 className="job-title">{job.companyName}</h3>
            <p className="job-desc">{job.subTitle}</p>
          </div>
           <div className="button-group">
          <button className="review-btn" onClick={()=>handleReview(job.companyName)}>
            Review
          </button>
           <button className='review-btn' onClick={()=>handleEndPosting(job.companyName)}>End Posting</button>
           </div>
        </div>
      ))}
    </div>
  );
};

export default CurrentOpenings;
