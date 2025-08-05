import React,{useState,useEffect, use} from 'react';
import '../Components_CSS/hero_Profile.css';
import { getStoreValue } from 'pulsy';
import Profile_SuperPower from '../Components/Profile_SuperPower';
import Navbar_Login from '../Components/Navbar_Login';
import { useNavigate } from 'react-router-dom';
const Hero_profile=()=>{
  const navigate=useNavigate();
    const [power,setPower]=useState([]);
    const [story,setStory]=useState('');
    const [weakness,setWeakness]=useState([]);
    const [battles, setBattles]=useState([]);
    const [role,setRole]=useState('');
    const username=getStoreValue('auth')?.user?.username;
    const name=localStorage.getItem('Name');
    const [navbar,setNavbar]=useState();
    const token=getStoreValue('auth')?.token;
    useEffect(()=>{
        const profileMatching=async()=>{
           
            try{
            const response=await fetch('http://localhost:5000/api/heroProfile',{
                method:'GET',
                headers:{'Content-Type':'application/json',
                    'Authorization': `Bearer ${token}`,},
            });
            if(response.ok){
                const data=await response.json();
                const maps=data.SuperPower.map((i)=>(
                    <Profile_SuperPower power={i}/>
                ));
                setPower(maps);
                setStory(data.BackStory);
                setWeakness(data.Weakness);
                setBattles(data.keyBattles);
                setRole(data.preferredRole);
            }
            else{
                console.log("NOT FOUND!")
            }
           
        }
        catch(error){
            console.log(error);
        }
    }
    profileMatching();
    },[]);
    
    return(
       
        <div className="cq-wrapper">
          {navbar}   
        <div className="cq-container">
          
  <div className="cq-hero-header">
    <div className="cq-avatar">
      <div className="cq-avatar-icon">⚡</div>
    </div>
    <div className="cq-hero-info">
      <h1 className="cq-name">{name}</h1>
      <p className="cq-username">@{username}</p>
    </div>
  </div>

  <div className="cq-section cq-powers">
    <h2>⚡ Superpowers & Abilities</h2>
    <div className="cq-cards-grid">
      {power}
    </div>
  </div>

  <div className="cq-section cq-powers">
   
      <h2>📖 Origin Story & Backstory</h2>
       <div className="cq-section cq-origin">
      <div className="cq-origin-box">
        <p>{story}</p>
      </div>
    </div>
</div>
<div className="cq-section cq-battles">
  <h2 className="cq-section-title">
    🗡️ Key Battles
  </h2>
  <ul className="cq-battles-list">
    {battles.map((battle, index) => (
      <li key={index} className="cq-battle-item">
        <strong>{battle}</strong> 
      </li>
    ))}
  </ul>
</div>


    <div className="cq-section cq-powers">
      <h2>❌ Known Weaknesses</h2>
       <div className="cq-section cq-origin">
      <ul className="cq-weakness-list">
        {weakness.map((weak,i)=>(
        <li>
          <strong>{weak}</strong> 
        </li>
       ))}
      </ul>
      </div>
    </div>

   <div className="cq-section cq-preferred-roles">
  <div className="cq-section-title">
    <span className="cq-section-icon">🎯</span>
    Preferred Roles
  </div>

  <div className="cq-featured-role-card">
    <h4>{role}</h4>
  </div>
  
</div>
<div ><button onClick={()=>navigate('/hero-profile-edit')} className='hero-profile-button'>Edit Profile</button></div>
</div>
</div>
    )
}
export default Hero_profile;