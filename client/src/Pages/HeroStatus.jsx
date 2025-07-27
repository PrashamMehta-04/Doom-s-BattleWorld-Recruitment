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
    const [chatButton,setChatButton]=useState(false);
    const token=getStoreValue('auth')?.token;
    useEffect(()=>{
        
        const fecthApplications = async () => {
            const response=await fetch(`http://localhost:5000/api/status-applications`,{
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });
            if(response.ok){
                const data=await response.json();
                console.log(data);
                setApplications(data);
                 const response2=await fetch('http://localhost:5000/api/hero-status',{
            method:'POST',
            headers:{'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body:JSON.stringify({applications:data})
        });
        if(response2.ok){
            const data1=await response2.json();
            setJobs(data1);
            console.log(data1);
            setJobNum(data1.length);
            
        }
        else{
            console.log("Failed to fetch jobs");
        }
            }
            else{
                console.log("Failed to fetch appliactions");
            }
        }
       
        
        fecthApplications();
    },[]);
    const statusMap=new Map();
    const buttonMap=new Map();
    applications.forEach((app) => {
        statusMap.set(app.name,app.status);
        if(app.status=='Pending'||app.status=='Rejected'){
           buttonMap.set(app.name, <button className="heroStatus-btn disabled" disabled>💬 Chat</button>);
        }
        else{
            buttonMap.set(app.name, <button className="heroStatus-btn" onClick={()=>{localStorage.setItem('jobTitle',app.name);navigate('/chat-user')}}>💬 Chat</button>);
        }
    });
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
      <h3 className="heroStatus-jobTitle">{job.companyName}</h3>
      
      <p className="heroStatus-appliedDate">Applied: March 5, 2024</p>
      <p className="heroStatus-description">{job.subTitle}</p>
      <div className="heroStatus-buttons">
        <button className="heroStatus-btn view" onClick={()=>{localStorage.setItem('jobTitle',job.companyName);navigate('/job-info')}}>📄 View More</button>
        <button className="heroStatus-btn pending">⏳ {statusMap.get(job.companyName)}</button>
        {buttonMap.get(job.companyName)}
        <button className="heroStatus-btn disabled" disabled>🎥 Video Call</button>
      </div>
    </div>
    ))}

  </div>
</div>

    )
}
export default HeroStatus;