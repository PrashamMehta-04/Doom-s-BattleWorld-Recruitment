import React, {useState} from 'react';
import '../Components_CSS/resumec.css';
import {useNavigate} from 'react-router-dom';
const Resume=()=>{
    const navigate=useNavigate();
   const[powerArr,setPowerArr]=useState(['']);
   const[battles,setBattles]=useState(['']);
   const[weak,setWeak]=useState(['']);
   const username=localStorage.getItem('userName');
   const [bStory,setBStory]=useState('');
   const[pRole,setProle]=useState('');
   const wadd=()=>{
    setWeak([...weak,'']);
   }
   const wremove=(index)=>{
    if(weak.length>1){
    const update=[...weak];
    update.splice(index,1);
    setWeak(update);
    }
   }
   const whandleChange=(index,weaks)=>{
    const update=[...weak];
    update[index]=weaks;
    setWeak(update);

   }
   const badd=()=>{
    setBattles([...battles,'']);
   }
   const bremove=(index)=>{
    if(battles.length>1){
        const updated=[...battles];
        updated.splice(index,1);
        setBattles(updated);
    }
   }
   const bhandleChange=(index,battle)=>{
    const updated=[...battles];
    updated[index]=battle;
    setBattles(updated);
   }
   const padd=()=>{
    setPowerArr([...powerArr,'']);
   }
   const premove=(index)=>{
    if(powerArr.length>1){
    const updated=[...powerArr];
    updated.splice(index,1);
    setPowerArr(updated);
    }
   }
    const phandleChange=(index,power)=>{
        const updated=[...powerArr];
        updated[index]=power;
        setPowerArr(updated);
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response=await fetch('http://localhost:5000/api/resume',{
           method:'POST',
           headers:{'Content-Type':'application/json'},
           body:JSON.stringify({username,powerArr,bStory,battles,weak,pRole}) 
        });
        if(response.ok){
            navigate('/Home_Logged');
        }
        else{
            console.log("Server Error!");
        }
    }
    return(
       
<div className="form-container">
  <h1>Create Your Hero Profile</h1>
  <p>Tell the multiverse about your powers and abilities</p>

  {/* Hero Superpower Section */}
  <section className="form-section">
    <h2>🔋 Hero Superpower</h2>
   {powerArr.map((power,index)=>(
    <div className="field-list">
     <input type="text" placeholder="Enter Superpower" 
     value={power}
     onChange={(e)=>phandleChange(index,e.target.value)}
     /> 
      <button onClick={()=>premove(index)} className="btn remove">Remove</button>
    </div>
))}
    <button onClick={padd}className="btn add">+ Add Superpower</button>
  </section>

  {/* Origin Story Section */}
  <section className="form-section">
    <h2>📖 Origin Story & Backstory</h2>
    <textarea placeholder="Tell your origin story..."
    value={bStory}
    onChange={(e)=>setBStory(e.target.value)}
    />
  </section>

  {/* Legendary Battles Section */}
  <section className="form-section">
    <h2>⚔️ Legendary Battles & Achievements</h2>
    {battles.map((battle,index)=>(
    <div className="field-list">
      <input type="text" placeholder="Battle/Achievement Title"
      value={battle}
      onChange={((e)=>bhandleChange(index,e.target.value))}
       />
      <button onClick={()=>bremove(index)} className="btn remove">Remove</button>
    </div>
    ))}
    <button onClick={badd} className="btn add">+ Add Another Battle</button>
  </section>

  {/* Weaknesses Section */}
  <section className="form-section">
    <h2>⚠️ Known Limitations & Weaknesses</h2>
    {weak.map((weaks,index)=>(
    <div className="field-list">
      <input type="text" placeholder="Enter Weakness"
      value={weaks}
      onChange={(e)=>whandleChange(index,e.target.value)}
      />
      <button onClick={()=>wremove(index)} className="btn remove">Remove</button>
    </div>
    ))}
    <button onClick={wadd} className="btn add">+ Add Weakness</button>
  </section>

  {/* Preferred Roles Section */}
  <section className="form-section">
    <h2>🔑 Preferred Roles & Positions</h2>
    <div className="field-list">
      <input type="text" placeholder="Role Title" 
      value={pRole}
      onChange={(e)=>setProle(e.target.value)}
      />
    </div>
  </section>

  <button onClick={handleSubmit} className="btn submit">Create Profile</button>
</div>

    )
}
export default Resume;