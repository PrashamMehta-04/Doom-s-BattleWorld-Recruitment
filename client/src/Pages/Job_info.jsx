import React,{useState,useEffect} from 'react';
import '../Components_CSS/job-info.css';
import Navbar_Login from'../Components/Navbar_Login';
const Job_info=()=>{
   return (
  <div className="job-info-container">
    <Navbar_Login/>
    <div className="job-info-header">
      <button className="job-info-back-button">← Back to Job Listings</button>
      <h1 className="job-info-title">Senior Full-Stack Developer</h1>
      <p className="job-info-subtitle">
        Join our elite team building the next generation of interdimensional web applications
      </p>
      <div className="job-info-tags">
        <span className="job-info-tag">Remote / Quantum Realm</span>
        <span className="job-info-tag">$120,000 - $180,000</span>
        <span className="job-info-tag">Full-Time</span>
      </div>
    </div>

    <div className="job-info-body">
      <section className="job-info-description-section">
        <h2 className="job-info-section-title">📄 Job Description</h2>
        <p className="job-info-description-text">
          We're seeking a talented Senior Full-Stack Developer to join our interdimensional development team at BattleWorld.
          You'll be responsible for building cutting-edge web applications that operate across multiple realities and timelines.
          <br /><br />
          As a key member of our engineering team, you'll work on revolutionary projects including our Quantum Hero Management System,
          Temporal Battle Analytics Platform, and the Multiverse Communication Network. Your code will literally help save dimensions!
          <br /><br />
          This role offers the unique opportunity to work with advanced technologies like React Quantum, Node.js Temporal Edition, and
          our proprietary Reality.js framework. You’ll collaborate with heroes, time travelers, and interdimensional beings to create
          seamless user experiences across all planes of existence.
          <br /><br />
          The ideal candidate thrives in fast-paced, high-stakes environments where debugging might involve preventing actual timeline
          paradoxes. Experience with conventional web technologies is required, but we’ll train you on our quantum computing systems
          and temporal debugging tools.
          <br /><br />
          Join us in building the future (and past, and alternate presents!) of web development. Your work will have impact across
          infinite dimensions and help maintain the stability of the multiverse itself.
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
          <p className="job-info-deadline-date">March 15, 2024</p>
          <span className="job-info-deadline-note">Only 12 days remaining!</span>
        </div>

        <div className="job-info-about-box">
          <h3 className="job-info-about-title">🏢 About BattleWorld</h3>
          <ul className="job-info-about-list">
            <li>Multiverse HQ, All Dimensions</li>
            <li>10,000+ Heroes Worldwide</li>
            <li>Founded 2019</li>
          </ul>
          <p className="job-info-about-text">
            Leading platform connecting heroes across dimensions for world-saving missions and interdimensional collaboration.
          </p>
        </div>

        <div className="job-info-apply-box">
          <h3 className="job-info-apply-title">🚀 Apply Now</h3>
          <form className="job-info-form">
            <label className="job-info-form-label">Upload Resume</label>
            <div className="job-info-upload-box">
              <p>Click to upload or drag and drop</p>
              <p className="job-info-upload-note">PDF, DOC, DOCX (Max 10MB)</p>
            </div>

            <button type="submit" className="job-info-submit-button">Submit Application</button>
          </form>
        </div>
      </section>
    </div>
  </div>
);

}
export default Job_info;    