import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Components_CSS/Job_Openingsc.css";

const CurrentOpenings = () => {
  const base_URL=import.meta.env.VITE_API_BASE_URL;
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');
  const [msg, setmsg] = useState('');
  const [showmsg, setShowMsg] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(`${base_URL}/api/doomOpenings`);
        const data = await res.json();
        setJobs(data);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      }
    };
    fetchJobs();
  }, []);

  const handleReview = (title) => {
    localStorage.setItem('Title', title);
    navigate("/doom-review");
  };

  const handleEndPosting = async (title) => {
    try {
      const response = await fetch(`${base_URL}/api/delete-post`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
      });

      if (response.ok) {
        setmsg('✅ Job post deleted successfully!');
        setJobs(prev => prev.filter(job => job.companyName !== title));
      } else {
        setmsg('❌ Failed to delete job post!');
      }
    } catch (err) {
      console.error("Delete error:", err);
      setmsg('❌ Error deleting job post!');
    }

    setShowMsg(true);
    setTimeout(() => setShowMsg(false), 2000);
  };

  const filteredJobs = jobs.filter(job =>
    job?.companyName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="openings-container">
      <h2 className="openings-header">Current Openings</h2>

      <input
        type="text"
        className="Doom-search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search company name..."
      />

      {showmsg && <p className="doom-msg">{msg}</p>}

      {filteredJobs.length > 0 ? (
        filteredJobs.map((job, index) => (
          <div key={index} className="job-card">
            <div className="job-info">
              <h3 className="job-title">{job.companyName}</h3>
              <p className="job-desc">{job.subTitle}</p>
            </div>

            <div className="button-group">
              <button className="review-btn" onClick={() => handleReview(job.companyName)}>
                Review
              </button>
              <button className="review-btn" onClick={() => handleEndPosting(job.companyName)}>
                End Posting
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="no-results">No job postings found.</p>
      )}
    </div>
  );
};

export default CurrentOpenings;
