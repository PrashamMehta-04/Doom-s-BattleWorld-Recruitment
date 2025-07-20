import React,{useState,useEffect} from 'react';
import '../Components_CSS/job-info.css';
import Navbar_Login from'../Components/Navbar_Login';
import useAuthGuard from '../Components/useAuthGuard';
import { getStoreValue } from 'pulsy';
const Job_info=()=>{
    useAuthGuard();
    const token=getStoreValue('auth')?.token;
    const title=localStorage.getItem('jobTitle');
    const [subTitle,setSubTitle]=useState('');
    const [desc,setDesc]=useState('');
    const [lDate,setLDate]=useState();
    const [salary,setSalary]=useState('');
    const [location,setLocation]=useState('');
    useEffect(()=>{
        const job_info=async()=>{
            try{
                const response=await fetch("http://localhost:5000/api/job-info",{
                    method:"POST",
                    headers:{
                        'Content-Type':'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body:JSON.stringify({Title:title})
                });
                if(response.ok){
                    const data=await response.json();
                    setSubTitle(data.subTitle);
                    setDesc(data.description);
                    setLDate(data.lastDate);
                    setSalary(data.salary);
                    setLocation(data.location);
                }
                else{
                    console.log("Error!");
                }
            }
            catch(error){
            console.log("Failed to fetch!",error);
        }
        }
        job_info(); 
    },[])
   return (
  <div className="job-info-container">
    <Navbar_Login/>
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
        <div className="job-info-requirements-grid">
          <div className="job-info-requirement-column">
            <h3 className="job-info-requirement-title">Technical Skills</h3>
            <ul className="job-info-requirement-list">
              <li>5+ years React.js experience</li>
              <li>4+ years Node.js & Express</li>
              <li>MongoDB/PostgreSQL expertise</li>
              <li>TypeScript proficiency</li>
              <li>RESTful API development</li>
            </ul>
          </div>
          <div className="job-info-requirement-column">
            <h3 className="job-info-requirement-title">Quantum Skills</h3>
            <ul className="job-info-requirement-list">
              <li>Temporal debugging experience</li>
              <li>Reality.js framework knowledge</li>
              <li>Multiverse deployment skills</li>
              <li>Paradox prevention protocols</li>
              <li>Quantum state management</li>
            </ul>
          </div>
          <div className="job-info-requirement-column">
            <h3 className="job-info-requirement-title">Soft Skills</h3>
            <ul className="job-info-requirement-list">
              <li>Strong problem-solving abilities</li>
              <li>Excellent communication skills</li>
              <li>Team collaboration experience</li>
              <li>Adaptability to new dimensions</li>
              <li>Crisis management under pressure</li>
            </ul>
          </div>
          <div className="job-info-requirement-column">
            <h3 className="job-info-requirement-title">Preferred</h3>
            <ul className="job-info-requirement-list">
              <li>AWS/Azure cloud experience</li>
              <li>Docker & Kubernetes</li>
              <li>GraphQL knowledge</li>
              <li>Previous hero team experience</li>
              <li>Interdimensional travel clearance</li>
            </ul>
          </div>
        </div>
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
        </div>

        <div className="job-info-apply-box">
         
            <button type="submit" className="job-info-submit-button">Submit Application</button>
        </div>
      </section>
    </div>
  </div>
);

}
export default Job_info;    