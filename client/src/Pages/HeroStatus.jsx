import React, {useState,useEffect} from 'react';
import '../Components_CSS/heroStatusc.css';
import Navbar_Login from '../Components/Navbar_Login';
import useAuthGuard from '../Components/useAuthGuard';
import {getStoreValue} from 'pulsy';
import {useNavigate} from 'react-router-dom';
// import { set } from '../../../server';
const HeroStatus=()=>{
    useAuthGuard();
  const base_URL=import.meta.env.VITE_API_BASE_URL;
    const navigate=useNavigate();
    const [applications, setApplications] = useState([{}]);
    const [jobs,setJobs]=useState([]);
    const [jobNum,setJobNum]=useState(0);
    const [acc, setAcc]=useState(0);
    const [rej, setRej]=useState(0);
    const [pen, setPen]=useState(0);
    const [date,setDate]=useState('');
    const [chatButton,setChatButton]=useState(false);
    const token=getStoreValue('auth')?.token;
    const [statusMap, setStatusMap] = useState(new Map());
    const [buttonMap, setButtonMap] = useState(new Map());
    const [videoButton, setVideoButton] = useState(new Map());
    const [DateMap,setDateMap]=useState(new Map())
    const [temp,setTemp]=useState([]);
    useEffect(()=>{
        
        const fecthApplications = async () => {
            const response=await fetch(`${base_URL}/api/status-applications`,{
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });
            if(response.ok){
                const data=await response.json();
                console.log(data);
                console.log(data.status);
                setApplications(data);
                 const response2=await fetch(`${base_URL}/api/hero-status`,{
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
            setTemp(data1);
            
        }
        else{
            console.log("Failed to fetch jobs");
        }
            }
            else{
                console.log("Failed to fetch applications");
            }
        }     
        
        fecthApplications();
    },[]);
    useEffect(() => {
    const statusMapTemp = new Map();
    const buttonMapTemp = new Map();
    const videoButtonTemp = new Map();
    const dateMapTemp=newMap()
    let Accepted = 0, Rejected = 0, Pending = 0;

    applications.forEach((app) => {
        statusMapTemp.set(app.name, app.status);

        if(app.status === 'Pending' || app.status === 'Rejected'){
            buttonMapTemp.set(app.name, <button className="heroStatus-btn disabled" disabled>💬 Chat</button>);
        } else {
            buttonMapTemp.set(app.name, <button className="heroStatus-btn" onClick={() => {
                localStorage.setItem('jobTitle', app.name);
                navigate('/chat-user');
            }}>💬 Chat</button>);
        }

        if(app.videoCall){
            videoButtonTemp.set(app.name, <button className="heroStatus-btn" onClick={() => navigate('/video-call')}>🎥 Video Call</button>);
        } else {
            videoButtonTemp.set(app.name, <button className="heroStatus-btn disabled" disabled>🎥 Video Call</button>);
        }
        let temp=app.Date;
        const options = { day: "2-digit", month: "long", year: "numeric" };
        const formatted = new Date(temp).toLocaleDateString("en-US", options);
        dateMapTemp.set(app.name,formatted);
        if(app.status === 'Accepted') {
            Accepted++;
        } else if(app.status === 'Rejected') {
            Rejected++;
        } else if(app.status === 'Pending') {
            Pending++;
        }
    });

    setAcc(Accepted);
    setRej(Rejected);
    setPen(Pending);
    setStatusMap(statusMapTemp);
    setButtonMap(buttonMapTemp);
    setVideoButton(videoButtonTemp);
    setDateMap(dateMapTemp);

}, [applications]);
const penJobs=()=>{
    const pArray=[];
    temp.forEach((job)=>{
        if(statusMap.get(job.companyName)=='Pending'){
           pArray.push(job);
        }
    });
     //setPenArray(pArray);
     setJobs(pArray);
}
const accJobs=()=>{
    const pArray=[];
    temp.forEach((job)=>{
        if(statusMap.get(job.companyName)=='Accepted'){
           pArray.push(job);
        }
    });
     //setPenArray(pArray);
     setJobs(pArray);
}
const rejJobs=()=>{
    const pArray=[];
    temp.forEach((job)=>{
        if(statusMap.get(job.companyName)=='Rejected'){
           pArray.push(job);
        }
    });
     //setPenArray(pArray);
     setJobs(pArray);
}

   
    return(
        <div className="heroStatus-container">
            <Navbar_Login/>
  <h1 className="heroStatus-title">My Applications</h1>
  <p className="heroStatus-subtitle">Track your hero job applications across the multiverse</p>

  <div className="heroStatus-stats">
    <div className="heroStatus-card"> <span className="heroStatus-count">{jobNum}</span> Total Applications </div>
    <div className="heroStatus-card"> <span className="heroStatus-count">{pen}</span> Pending Review </div>
    <div className="heroStatus-card"> <span className="heroStatus-count">{acc}</span> Accepted </div>
    <div className="heroStatus-card"> <span className="heroStatus-count">{rej}</span> Rejected </div>
  </div>

  <div className="heroStatus-tabs">
    <button className="heroStatus-tab active" onClick={()=>window.location.reload()}>All Applications</button>
    <button className="heroStatus-tab" onClick={penJobs}>Pending</button>
    <button className="heroStatus-tab" onClick={accJobs}>Accepted</button>
    <button className="heroStatus-tab" onClick={rejJobs}>Rejected</button>
  </div>
 
  <div className="heroStatus-applications">

    
       {jobs.map((job,index)=>(
    <div className="heroStatus-jobCard pending" key={index}>
      <h3 className="heroStatus-jobTitle">{job.companyName}</h3>
      
      <p className="heroStatus-appliedDate">{DateMap.get(job.companyName)}</p>
      <p className="heroStatus-description">{job.subTitle}</p>
      <div className="heroStatus-buttons">
        <button className="heroStatus-btn view" onClick={()=>{localStorage.setItem('jobTitle',job.companyName);navigate('/job-info')}}>📄 View More</button>
        <button className="heroStatus-btn pending">⏳ {statusMap.get(job.companyName)}</button>
        {buttonMap.get(job.companyName)}
        {videoButton.get(job.companyName)}
        {/* <button className="heroStatus-btn disabled" disabled>🎥 Video Call</button> */}
      </div>
    </div>
    ))}

  </div>
</div>

    )
}
export default HeroStatus;