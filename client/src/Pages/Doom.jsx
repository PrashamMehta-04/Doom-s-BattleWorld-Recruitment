import React, { useState, useEffect } from 'react';
import Login_Button from '../Components/Login_Button';
import FeatureBox from '../Components/Feature_Box';
import circleUser from '../Components_CSS/circle-user.svg';
import calender from '../Components_CSS/calendar.svg';
import msg from '../Components_CSS/message-square.svg';
import search from '../Components_CSS/search-check.svg';
import { useNavigate } from 'react-router-dom';
import Navbar_Login from '../Components/Doom_Navbar';
import Job_Cards from '../Components/Job_Cards';
import Welcome from '../Components/Doom_Welcome';
import useAuthGuard from '../Components/useAuthGuard';

const Doom = () => {
    
    const Name=localStorage.getItem('Name');
    const n=5;
    const [tot, setTot] = useState(0);
    const [pending, setPending] = useState(0);
    const [accepted, setAccepted] = useState(0);

    useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/doomOpenings");
        const data = await res.json();
        setTot(data.length);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      }
    };
    const pendingApplications = async () => {
      try{
        const res1 = await fetch("http://localhost:5000/api/pendingApplications");
        const data = await res1.json();
        setPending(data.totalApplicants || 0);
      }
      catch(err){
        console.error("Error fetching pending applications:", err);
      }
    };
    const acceptedApplications = async () => {
      try {
        const res2 = await fetch("http://localhost:5000/api/hero-acc");
        const data1 = await res2.json();
        setAccepted(data1.acc || 0);
      } catch (err) {
        console.error("Error fetching accepted applications:", err);
      }
    };
    fetchJobs(),
    pendingApplications(),
    acceptedApplications();
  }, []);
    return(
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', height:"auto" }}>
        <Navbar_Login/> 
         <Welcome name={Name} stats={{ activePositions: tot, totalApplicants: pending, shortlisted: accepted}} />
      </div>  
    )
}
export default Doom;