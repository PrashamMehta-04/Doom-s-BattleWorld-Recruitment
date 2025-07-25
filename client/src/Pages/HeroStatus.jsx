import React, {useState,useEffect} from 'react';
import '../Components_CSS/heroStatusc.css';
import Navbar_Login from '../Components/Navbar_Login';
import useAuthGuard from '../Components/useAuthGuard';
import {getStoreValue} from 'pulsy';
import {useNavigate} from 'react-router-dom';
const HeroStatus=()=>{
    useAuthGuard();
    const navigate=useNavigate();
    const [applications, setApplications] = useState([{}]);
    const [jobs,setJobs]=useState([]);
    const [jobNum,setJobNum]=useState(0);
    const token=getStoreValue('auth')?.token;
    useEffect(()=>{
        
        const fecthApplications = async () => {
            const response=await fetch(`http://localhost:5000/api/status-applications`,{
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                }
            });
            if(response.ok){
                const data=await response.json();
                setApplications(data);
            }
            else{
                console.log("Failed to fetch appliactions");
            }
        }
        const fetchJobs=async()=>{
         const response=await fetch('http://localhost:5000/api/hero-status',{
            method:'POST',
            headers:{'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body:JSON.stringify({applications})
        });
        if(response.ok){
            const data=await response.json();
            setJobs(data);
            setJobNum(data.length);
        }
        else{
            console.log("Failed to fetch jobs");
        }
    }
        fecthApplications();
        fetchJobs();     
    },[]);
    return(
        <div className="heroStatus-container">
            <Navbar_Login/>
  <h1 className="heroStatus-title">My Applications</h1>
  <p className="heroStatus-subtitle">Track your hero job applications across the multiverse</p>

  <div className="heroStatus-stats">
    <div className="heroStatus-card"> <span className="heroStatus-count">{jobNum}</span> Total Applications </div>
    <div className="heroStatus-card"> <span className="heroStatus-count">3</span> Pending Review </div>
    <div className="heroStatus-card"> <span className="heroStatus-count">4</span> Accepted </div>
    <div className="heroStatus-card"> <span className="heroStatus-count">1</span> Rejected </div>
  </div>

  <div className="heroStatus-tabs">
    <button className="heroStatus-tab active">All Applications</button>
    <button className="heroStatus-tab">Pending</button>
    <button className="heroStatus-tab">Accepted</button>
    <button className="heroStatus-tab">Rejected</button>
  </div>
 
  <div className="heroStatus-applications">

    
       {jobs.map((job,index)=>(
    <div className="heroStatus-jobCard pending">
      <h3 className="heroStatus-jobTitle">job.companyName</h3>
      
      <p className="heroStatus-appliedDate">Applied: March 5, 2024</p>
      <p className="heroStatus-description">job.subTitle</p>
      <div className="heroStatus-buttons">
        <button className="heroStatus-btn view" onClick={()=>navigate('/job-info')}>📄 View More</button>
        <button className="heroStatus-btn pending">⏳ Pending</button>
        <button className="heroStatus-btn disabled" disabled>💬 Chat</button>
        <button className="heroStatus-btn disabled" disabled>🎥 Video Call</button>
      </div>
    </div>
    ))}

  </div>
</div>

    )
}
export default HeroStatus;