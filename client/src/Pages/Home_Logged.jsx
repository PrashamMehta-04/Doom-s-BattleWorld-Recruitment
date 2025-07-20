import React,{useState,useEffect} from 'react';
import Navbar_Login from '../Components/Navbar_Login';
import Welcome from '../Components/Welcome';
import Making_Profile from '../Components/making_Profile';
import Job_Cards from '../Components/Job_Cards';
import useAuthGuard from '../Components/useAuthGuard';
import {getStoreValue} from 'pulsy';
import {useNavigate} from 'react-router-dom';
const Home_Logged=()=>{
  const navigate=useNavigate();
  useAuthGuard();
    const [jobs,setJobs]=useState([]);
    const [len,setLen]=useState();
    const[profile,setProfile]=useState();
    const token=getStoreValue('auth')?.token;
    useEffect(()=>{
      const complete=async()=>{
        try{
        const response2=await fetch('http://localhost:5000/api/profile',{
          method:'GET',
      headers:{'Content-Type':'application/json',
         'Authorization': `Bearer ${token}`,
      }
        });
        if(response2.ok){
          const make=<Making_Profile/>;
          setProfile(make);
        }
      }
      catch(error){
        console.log('Profile Error! ',error);
      }
    }
    const fetchCards=async()=>{
      try{
    const response=await fetch('http://localhost:5000/api/cards',{
      method:'GET',
      headers:{'Content-Type':'application/json',
         'Authorization': `Bearer ${token}`,
      }
    });
    if(response.ok){
     const data=await response.json();
     setLen(data.length);
     const maps=data.map((job,i)=>(
      <Job_Cards
      Title={job.companyName}
      subTitle={job.subTitle}
      item1={job.lastDate}
      item2={job.salary}
      item3={job.location}
      
      />
     ));
     setJobs(maps);
    }
    else{
      console.log("Failed To fatch");
    }
  }
  catch(error){
    console.error("Failed to fetch ", error);
  }
  }
  complete();
  fetchCards();
},[]);
    const Name=localStorage.getItem('Name');
    
    return(
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', height:"auto" }}>
        <Navbar_Login/> 
         <Welcome name={Name} jobs={len} applications={"5"} interviews={"2"}/>
        <div>{profile}</div>
       <p style={{textAlign:'left', marginLeft:'25px', fontSize:"20px", fontWeight:'bold'}}>Recommended Jobs</p>
        {/* <div style={{display:"flex", flexWrap:"wrap", alignItems:"stretch", gap:"20px"}}>{jobs}</div> */}
        <div style={{
  display: "flex",
  flexWrap: "wrap",
  gap: "20px",
  justifyContent: "center", 
  padding: "0 20px"
}}>
  {jobs}
</div>

      </div>  
    )
}
export default Home_Logged;