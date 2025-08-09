import React, { useState, useEffect } from 'react';
import '../Components_CSS/job-info.css';
import Navbar_Login from '../Components/Navbar_Login';
import useAuthGuard from '../Components/useAuthGuard';
import { getStoreValue } from 'pulsy';
import { useNavigate } from 'react-router-dom';


const Job_info = () => {
  useAuthGuard();
  const today = new Date();
  const base_URL=import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const token = getStoreValue('auth')?.token;
  const title = localStorage.getItem('jobTitle');
  const [subTitle, setSubTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [lDate, setLDate] = useState();
  const [salary, setSalary] = useState('');
  const [location, setLocation] = useState('');
  const [requirements, setRequirements] = useState([]);
  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);


  // const handleSubmit=async()=>{
  //     const response=await fetch('${base_URL}/api/hero-user',{
  //         method:'POST',
  //         headers:{'Content-Type':'application/json',
  //             'Authorization': `Bearer ${token}`,
  //         },
  //         body:JSON.stringify({title})
  //     });
  //     if(response.ok){
  //         console.log("Applied");
  //         navigate('/home-logged');
  //     }
  // }
  const handleSubmit = async () => {
    try {
      const response = await fetch(`${base_URL}/api/hero-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ title,today })
      });

      if (response.ok) {
        setPopupMessage("✅ Application submitted successfully!");
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
          navigate('/home-logged');
        }, 2000);
      }
      else if(response.status==404){
        setPopupMessage("❌ Make your profile first!");
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000);
      }
       else {
        setPopupMessage("❌ Failed to submit your application.");
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000);
      }
    } catch (error) {
      console.error("Submit error:", error);
      setPopupMessage("❌ Error occurred while submitting.");
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    }
  }


  useEffect(() => {
    const job_info = async () => {
      try {
        const response = await fetch(`${base_URL}/api/job-info`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ Title: title })
        });
        if (response.ok) {
          const data = await response.json();
          setSubTitle(data.subTitle);
          setDesc(data.description);
          setLDate(data.lastDate);
          setSalary(data.salary);
          setLocation(data.location);
          setRequirements(data.requirements);
        }
        else {
          console.log("Error!");
        }
      }
      catch (error) {
        console.log("Failed to fetch!", error);
      }
    }
    job_info();
  }, [])
  return (
    <div className="job-info-container">
      <Navbar_Login />
      <div className="job-info-header">
        <button className="job-info-back-button">← Back to Job Listings</button>
        <h1 className="job-info-title">{title}</h1>
        <p className="job-info-subtitle">
          {subTitle}
        </p>
        <div className="job-info-tags">
          <span className="job-info-tag">${salary}</span>
        </div>
      </div>

      <div className="job-info-body">
        <section className="job-info-description-section">
          <h2 className="job-info-section-title">📄 Job Description</h2>
          <p className="job-info-description-text">
            {desc}
          </p>
        </section>

        <section className="job-info-requirements-section">
          <h2 className="job-info-section-title">✅ Requirements</h2>
          {requirements.map((req, index) => (
            <div className="job-info-requirements-grid">
              <div className="job-info-requirement-column">
                <h3 className="job-info-requirement-title">{req}</h3>
              </div>
            </div>
          ))}
        </section>

        <section className="job-info-application-sidebar">
          <div className="job-info-deadline-box">
            <h3 className="job-info-deadline-title">📅 Application Deadline</h3>
            <p className="job-info-deadline-date">{lDate}</p>

          </div>

          <div className="job-info-about-box">
            <h3 className="job-info-about-title">🏢 About BattleWorld</h3>
            <ul className="job-info-about-list">
              <li>{location}</li>
            </ul>
            <p className="job-info-about-text">
              Leading platform connecting heroes across dimensions for world-saving missions and interdimensional collaboration.
            </p>
            <button type="submit" className="job-info-submit-button" onClick={handleSubmit}>Submit Application</button>
          </div>
          {showPopup && (
            <div className="popup-notification">
              {popupMessage}
            </div>
          )}

        </section>
      </div>
    </div>
  );

}
export default Job_info;    