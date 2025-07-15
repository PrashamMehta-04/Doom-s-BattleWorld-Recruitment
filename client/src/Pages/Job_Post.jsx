import React, { useState } from 'react';
import '../Components_CSS/Job_Postc.css';
import {useNavigate} from 'react-router-dom';

const Job_Post = () => {
  const [companyName, setCompanyName] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [description, setDescription] = useState('');
  const [lastDate, setLastDate] = useState('');
  const [salary, setSalary] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:5000/api/job_post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ companyName, subTitle, description, lastDate, salary, location })
        });
        if (response.ok) {
        alert("Job Posted Successfully!");
        setCompanyName('');
        setDescription('');
        setLastDate('');
        setSalary('');
        setLocation('');
        navigate('../doom');
      }
      else {
        alert("Failed to post job");
      }
    } catch (error) {
      console.error("Error posting job:", error);
    }
  };

  return (
    <div className="jobpost-bg">
      <div className="jobpost-glass-card">
        <div className="jobpost-logo">
          <span role="img" aria-label="bolt" className="jobpost-bolt">⚡</span>
          <span className="jobpost-title">BattleWorld</span>
        </div>
        <h2>Welcome, Partner!</h2>
        <p className="jobpost-subtitle">Post a job and help heroes find their path</p>
        <form className="jobpost-form" onSubmit={handleSubmit}>

          <label className="jobpost-label">Job Title</label>
          <input
            type="text"
            placeholder="Enter Job Title"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
            className="jobpost-input"
          />
          <label className="jobpost-label">Job Sub Title</label>
          <input
            type="text"
            placeholder="Enter Job Sub Title"
            value={subTitle}
            onChange={(e) => setSubTitle(e.target.value)}
            required
            className="jobpost-input"
          />

          <label className="jobpost-label">Post Description</label>
          <textarea
            placeholder="Briefly describe the job responsibilities and requirements"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="jobpost-input jobpost-textarea"
            rows={3}
          ></textarea>

          <label className="jobpost-label">Last Date of Application</label>
          <input
            type="Date"
            value={lastDate}
            onChange={(e) => setLastDate(e.target.value)}
            required
            className="jobpost-input"
          />

          <label className="jobpost-label">Salary Range</label>
          <input
            type="text"
            placeholder="e.g. ₹50,000 - ₹70,000"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            required
            className="jobpost-input"
          />

          <label className="jobpost-label">Job Location</label>
          <input
            type="text"
            placeholder="e.g. Mumbai, India"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="jobpost-input"
          />

          <button type="submit" className="jobpost-btn">Submit</button>
        </form>
        <h4 className="jobpost-subtitle">Need help? <a href="/contact">Contact us</a></h4>
      </div>
    </div>
  );
};

export default Job_Post;

