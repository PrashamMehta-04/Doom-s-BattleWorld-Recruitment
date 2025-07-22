import React, {useState} from 'react';
import '../Components_CSS/resumec.css';
import {useNavigate} from 'react-router-dom';
import {getStoreValue} from 'pulsy';
import useAuthGuard from '../Components/useAuthGuard';
const Resume=()=>{
    useAuthGuard();
    const navigate=useNavigate();
   const[powerArr,setPowerArr]=useState(['']);
   const[battles,setBattles]=useState(['']);
   const[weak,setWeak]=useState(['']);
   const username=localStorage.getItem('userName');
   const [bStory,setBStory]=useState('');
   const[pRole,setProle]=useState('');
   const [pdfUrl,setPdfUrl]=useState('');
   const wadd=()=>{
    setWeak([...weak,'']);
   }
   const handleFileChange=(e)=>{
    const selected=e.target.files[0];
    if(selected&&selected.size<=10*1024*1024){
      setPdfUrl(selected);
    }
    else{
      console.log("File too large!");
    }
   }
   const token=getStoreValue('auth')?.token;
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
        if(!pdfUrl){
          console.log("please upload your resume!");
        }
        else{       
        const formData=new FormData();
        formData.append('file',pdfUrl);
        formData.append('upload_preset',"doom-s_battleworld");
        const cloud=await fetch("https://api.cloudinary.com/v1_1/dgkaav5s7/raw/upload",{
          method:'POST',
          body:formData,
        });
        
        const data=await cloud.json();
        const url=data.secure_url;
         const response=await fetch('http://localhost:5000/api/resume',{
           method:'POST',
           headers:{'Content-Type':'application/json',
             Authorization: `Bearer ${token}`,
           },
           body:JSON.stringify({powerArr,bStory,battles,weak,pRole,url}) 
        });
        if(response.ok){
            navigate('/home-logged');
        }
        else{
            console.log("Server Error!");
        }
      
      }
    }
    return(
       
<div className="base-container">
  <h1>Create Your Hero Profile</h1>
  <p>Tell the multiverse about your powers and abilities</p>

  {/* Hero Superpower Section */}
  <section className="form-section">
    <h2>🔋 Hero Superpower</h2>
   {powerArr.map((power,index)=>(
    <div className="field-list">
     <input type="text" placeholder="Enter Superpower"className='rinput' 
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
    <textarea placeholder="Tell your origin story..." className='rText'
    value={bStory}
    onChange={(e)=>setBStory(e.target.value)}
    />
  </section>

  {/* Legendary Battles Section */}
  <section className="form-section">
    <h2>⚔️ Legendary Battles & Achievements</h2>
    {battles.map((battle,index)=>(
    <div className="field-list">
      <input type="text" placeholder="Battle/Achievement Title" className='rinput' 
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
      <input type="text" placeholder="Enter Weakness" className='rinput' 
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
      <input type="text" placeholder="Role Title" className='rinput' 
      value={pRole}
      onChange={(e)=>setProle(e.target.value)}
      />
    </div>
  </section>
   <div className="job-info-apply-box">
          <h3 className="job-info-apply-title">🚀 Apply Now</h3>
          <form className="job-info-form">
            <label className="job-info-form-label">Upload Resume</label>
            <div className="job-info-upload-box">
               <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                />
              <p>Click to upload or drag and drop</p>
              <p className="job-info-upload-note">PDF, DOC, DOCX (Max 10MB)</p>
            </div>
             </form>
             </div>

  <button onClick={handleSubmit} className="btn submit">Create Profile</button>
</div>

    )
}
export default Resume;