import React from 'react';
import Navbar_Login from '../Components/Navbar_Login';
import Welcome from '../Components/Welcome';
import Making_Profile from '../Components/making_Profile';
import Job_Cards from '../Components/Job_Cards';
const Home_Logged=()=>{
    const jobs=[];
    const data=[{Title:"Quantum Energy Specialist",subTitle:"Control energy in high-stress combat zone",item1:"Knowhere, Andromeda Galaxy",item2:"80K-120K Celestial Credits",item3:"Apply Before: July 30,2025"},{Title:"Quantum Energy Specialist",subTitle:"Control energy in high-stress combat zone",item1:"Knowhere, Andromeda Galaxy",item2:"80K-120K Celestial Credits",item3:"Apply Before: July 30,2025"},{Title:"Quantum Energy Specialist",subTitle:"Control energy in high-stress combat zone",item1:"Knowhere, Andromeda Galaxy",item2:"80K-120K Celestial Credits",item3:"Apply Before: July 30,2025"},{Title:"Quantum Energy Specialist",subTitle:"Control energy in high-stress combat zone",item1:"Knowhere, Andromeda Galaxy",item2:"80K-120K Celestial Credits",item3:"Apply Before: July 30,2025"},{Title:"Quantum Energy Specialist",subTitle:"Control energy in high-stress combat zone",item1:"Knowhere, Andromeda Galaxy",item2:"80K-120K Celestial Credits",item3:"Apply Before: July 30,2025"}]
    const n=5;
     for (let i=0;i<n;i++) {
            jobs.push(<Job_Cards Title={data[i].Title} subTitle={data[i].subTitle} item1={data[i].item1} item2={data[i].item2} item3={data[i].item3}/>)    
     }
    return(
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', height:"auto" }}>
        <Navbar_Login/> 
         <Welcome name="Valkyrie" jobs="42" applications={"5"} interviews={"2"}/>
        <Making_Profile/>
       <p style={{textAlign:'left', marginLeft:'25px', fontSize:"20px", fontWeight:'bold'}}>Recommended Jobs</p>
        <div style={{justifyContent:"space-between", display:"flex", flexWrap:"wrap", alignItems:"stretch", gap:"20px"}}>{jobs}</div>
      </div>  
    )
}
export default Home_Logged;