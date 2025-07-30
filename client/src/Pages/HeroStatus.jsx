import React, {useState,useEffect} from 'react';
import '../Components_CSS/heroStatusc.css';
import Navbar_Login from '../Components/Navbar_Login';
import useAuthGuard from '../Components/useAuthGuard';
import {getStoreValue} from 'pulsy';
import {useNavigate} from 'react-router-dom';
// import { set } from '../../../server';
const HeroStatus=()=>{
    useAuthGuard();
    const navigate=useNavigate();
    const [applications, setApplications] = useState([{}]);
    const [jobs,setJobs]=useState([]);
    const [jobNum,setJobNum]=useState(0);
    const [acc, setAcc]=useState(0);
    const [rej, setRej]=useState(0);
    const [pen, setPen]=useState(0);
    const [chatButton,setChatButton]=useState(false);
    const token=getStoreValue('auth')?.token;
    const [statusMap, setStatusMap] = useState(new Map());
    const [buttonMap, setButtonMap] = useState(new Map());
    const [videoButton, setVideoButton] = useState(new Map());

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
                console.log(data.status);
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
                console.log("Failed to fetch applications");
            }
        }     
        
        fecthApplications();
    },[]);
    useEffect(() => {
    const statusMapTemp = new Map();
    const buttonMapTemp = new Map();
    const videoButtonTemp = new Map();

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

}, [applications]);

    // const statusMap=new Map();
    // const buttonMap=new Map();
    // const videoButton=new Map();
    // let Accepted = 0, Rejected = 0, Pending = 0;
    // applications.forEach((app) => {
    //     statusMap.set(app.name,app.status);
    //     if(app.status=='Pending'||app.status=='Rejected'){
    //        buttonMap.set(app.name, <button className="heroStatus-btn disabled" disabled>💬 Chat</button>);
    //     }
    //     else{
    //         buttonMap.set(app.name, <button className="heroStatus-btn" onClick={()=>{localStorage.setItem('jobTitle',app.name);navigate('/chat-user')}}>💬 Chat</button>);
    //     }
    //     if(app.videoCall){
    //         videoButton.set(app.name, <button className="heroStatus-btn" onClick={()=>navigate('/video-call')}>🎥 Video Call</button>)
    //     }
    //     else{
    //         videoButton.set(app.name, <button className="heroStatus-btn disabled" disabled>🎥 Video Call</button>);
    //     }
    //     if(app.status === 'Accepted') {
    //         Accepted++;
    //     } else if(app.status === 'Rejected') {
    //         Rejected++;
    //     } else if(app.status === 'Pending') {
    //         Pending++;
    //     }

    // });
    // setAcc(Accepted);
    // setRej(Rejected); 
    // setPen(Pending);
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
    <button className="heroStatus-tab active">All Applications</button>
    <button className="heroStatus-tab">Pending</button>
    <button className="heroStatus-tab">Accepted</button>
    <button className="heroStatus-tab">Rejected</button>
  </div>
 
  <div className="heroStatus-applications">

    
       {jobs.map((job,index)=>(
    <div className="heroStatus-jobCard pending" key={index}>
      <h3 className="heroStatus-jobTitle">{job.companyName}</h3>
      
      <p className="heroStatus-appliedDate">Applied: March 5, 2024</p>
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