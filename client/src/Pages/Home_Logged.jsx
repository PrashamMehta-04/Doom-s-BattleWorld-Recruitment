import React,{useState,useEffect} from 'react';
import Navbar_Login from '../Components/Navbar_Login';
import Welcome from '../Components/Welcome';
import Making_Profile from '../Components/making_Profile';
import Job_Cards from '../Components/Job_Cards';
import useAuthGuard from '../Components/useAuthGuard';
import {getStoreValue} from 'pulsy';
import {useNavigate} from 'react-router-dom';
import JobList from '../Components/Job_List';
import '../Components_CSS/home_logged_search.css';
const Home_Logged=()=>{
  const navigate=useNavigate();
  useAuthGuard();
    const [jobs,setJobs]=useState([]);
    const [len,setLen]=useState(0);
    const [res, setRes]=useState(0);
    const[profile,setProfile]=useState();
    const [allJobs, setAllJobs] = useState([]);
    const token=getStoreValue('auth')?.token;
    const [search, setSearch]=useState('');
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
     const {data,result}=await response.json();
     const set=new Set(result);
     console.log(set.size);
     setLen(data.length);
     setRes(data.length - set.size);
     
     const maps=data.map((job,i)=>{
     if(!set.has(job.companyName)){
      return(
      <Job_Cards
      Title={job.companyName}
      subTitle={job.subTitle}
      item1={job.lastDate}
      item2={job.salary}
      item3={job.location}
     
      />)
     }
    });
     setJobs(maps);
     setAllJobs(maps); 
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
    const handleSearch = () => {
  console.log(jobs);
  if (search.trim().length > 0) {
    const term = search
      .toLowerCase()
      .replace(/\s+/g, '');

    // filter out undefined and match against the element's props.Title
    const filtered = jobs.filter((job) => {
      if (!job || !job.props) return false;
      const title = job.props.Title
        .toLowerCase()
        .replace(/\s+/g, '');
      return title.includes(term);
    });

    setJobs(filtered);
  }
  else if(search.length===0){
    setJobs(allJobs)
  }
};
    return(
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', height:"auto" }}>
        <Navbar_Login/> 
         <Welcome name={Name} jobs={len} availableJobs={res}/>
        <div>{profile}</div>
       <p style={{textAlign:'left', marginLeft:'25px', fontSize:"20px", fontWeight:'bold'}}>Recommended Jobs</p>
       <div className="search-container">
      <input type="text" className="search-input" placeholder="Search..." value={search} onChange={(e)=>setSearch(e.target.value)}_/>
  <button className="search-button" onClick={handleSearch}>Search</button>
</div>
        {/* <div style={{display:"flex", flexWrap:"wrap", alignItems:"stretch", gap:"20px"}}>{jobs}</div> */}
        <JobList jobs={jobs} />

        {/* <div style={{
  display: "flex",
  flexWrap: "wrap",
  gap: "20px",
  // justifyContent: "center", 
  padding: "0 20px"
}}>
  {jobs}
</div> */}

      </div>  
    )
}
export default Home_Logged;