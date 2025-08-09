import React, { use, useState } from 'react';
import '../Components_CSS/Job_Postc.css';
import { useNavigate } from 'react-router-dom';
import Navbar_Login from '../Components/Doom_Navbar';

import {getStoreValue} from 'pulsy';
const Job_Post = () => {
  const base_URL=import.meta.env.VITE_API_BASE_URL;
  const [companyName, setCompanyName] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [description, setDescription] = useState('');
  const [lastDate, setLastDate] = useState('');
  const [salary, setSalary] = useState('');
  const [location, setLocation] = useState('');
  const [requirements, setRequirements] = useState([""]);
  const [msg, setMsg] = useState('');
  const [showmsg, setShowMsg] = useState(false);
  const navigate = useNavigate();

  const username=getStoreValue('auth')?.user?.username;
  const radd = () => {
    setRequirements([...requirements, '']);
  }
  const rremove = (index) => {
    if (requirements.length > 1) {
      const updated = [...requirements];
      updated.splice(index, 1);
      setRequirements(updated);
    }
  }
  const rhandleChange = (index, req) => {
    const updated = [...requirements];
    updated[index] = req;
    setRequirements(updated);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${base_URL}/api/job_post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ companyName, subTitle, description, lastDate, salary, location, requirements })
      });
      if (response.ok) {
        setMsg('✅ Job posted Succesfully!');
        setShowMsg(true);
        setTimeout(() => {
          setShowMsg(false);
          navigate('../doom');
        }, 2000);
        setCompanyName('');
        setDescription('');
        setLastDate('');
        setSalary('');
        setLocation('');
      }
      else {
        setMsg('❌ Failed to Post Job');
        setShowMsg(true);
        setTimeout(() => setShowMsg(false), 3000);
      }
    } catch (error) {
      console.error("Error posting job:", error);
    }
  };

  return (

    <div className="jobpost-bg">
      <Navbar_Login></Navbar_Login>
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
          {/* <label className="jobpost-label">Job Requirements</label>
           {requirements.map((requirements,index)=>(
            <div>
          <input
            type="text"
            placeholder="Enter Job Requirement"
            value={requirements}
            onChange={(e) => rhandleChange(index,e.target.value)}
            required
            className="jobpost-input"
          />
           <button className="job-post-btn-remove" onClick={()=>rremove(index)}>Remove</button>
          </div>
          ))}
          <button className="job-post-btn-add" onClick={radd}>Add</button> */}
          <label className="jobpost-label">Job Requirements</label>
          {requirements.map((req, index) => (
            <div className="input-with-remove" key={index}>
              <input
                type="text"
                placeholder="Enter Job Requirement"
                value={req}
                onChange={(e) => rhandleChange(index, e.target.value)}
                required
                className="jobpost-input"
              />
              <button
                type="button"
                className="remove-btn"
                onClick={() => rremove(index)}
                title="Remove requirement"
              >
                ✕
              </button>
            </div>
          ))}
          <div className="button-row">
            <button type="button" className="job-post-btn" onClick={radd}>
              Add Requirement
            </button>
          </div>



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
        <div>
          {showmsg && <p className="msgg">{msg}</p>}
        </div>
        <h4 className="jobpost-subtitle">Need help? <a href="/contact">Contact us</a></h4>
      </div>
    </div>
  );
};

export default Job_Post;

