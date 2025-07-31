import React, { useEffect, useState } from 'react';
import '../Components_CSS/resumec.css';
import { useNavigate } from 'react-router-dom';
import { getStoreValue } from 'pulsy';
import useAuthGuard from '../Components/useAuthGuard';


const HeroProfileEdit = () => {
  useAuthGuard();
  const [powerArr, setPowerArr] = useState(['']);
  const [battles, setBattles] = useState(['']);
  const [weak, setWeak] = useState(['']);
  const [bStory, setBStory] = useState('');
  const [pRole, setProle] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');
  const [email, setEmail] = useState('');
  const token = getStoreValue('auth')?.token;
  const navigate = useNavigate();
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.size <= 10 * 1024 * 1024) {
      console.log(selected);
      setPdfUrl(selected);
    }
    else {
      console.log("File too large!");
    }
  }
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/editprofile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        console.log(data);
        setEmail(data.email || '');
        setPowerArr(data.SuperPower || ['']);
        setBattles(data.Battles || ['']);
        setWeak(data.Weakness || ['']);
        setBStory(data.BackStory || '');
        setProle(data.PreferredRole || '');
      } catch (err) {
        console.error(err);
      }
    };
    const fetchEmail = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/get-email', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const data1 = await res.json();
        if(res.ok){
          setEmail(data1.email || '');
        }
        else{
          console.error("Failed to fetch email:", data1.error);
        }
      } catch (err) {
        console.error('Error fetching email:', err);
      }
    };
    fetchProfile();
      fetchEmail();
  }, [token]);


  const handleUpdate = async () => {
    if (!pdfUrl) {
      console.log("please upload your resume!");
    }
    else {
      const formData = new FormData();
      formData.append('file', pdfUrl);
      formData.append('upload_preset', "doom-s_battleworld");
      const cloud = await fetch("https://api.cloudinary.com/v1_1/dgkaav5s7/raw/upload", {
        method: 'POST',
        body: formData,
      });

      const data = await cloud.json();
      console.log(data);
      const url = data.secure_url;
      const response = await fetch('http://localhost:5000/api/resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ powerArr, battles, weak, bStory, pRole, url, email })
      });
      if (response.ok) navigate('/home-logged');
    };
  }

  return (
    <div className="base-container">
      <h1>Edit Your Hero Profile</h1>
      <p>Update your multiverse details</p>
      <section className="form-section">
        <h2>📧 Email</h2>
        <div className="field-list">
          <input
            type="email"
            className="rinput"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </section>

      <section className="form-section">
        <h2>🔋 Hero Superpower</h2>
        {powerArr.map((power, index) => (
          <div className="field-list" key={index}>
            <input type="text" className="rinput" value={power} onChange={(e) => {
              const updated = [...powerArr];
              updated[index] = e.target.value;
              setPowerArr(updated);
            }} />
            <button onClick={() => {
              if (powerArr.length > 1) {
                const updated = [...powerArr];
                updated.splice(index, 1);
                setPowerArr(updated);
              }
            }} className="btn remove">Remove</button>
          </div>
        ))}
        <button onClick={() => setPowerArr([...powerArr, ''])} className="btn add">+ Add Superpower</button>
      </section>

      <section className="form-section">
        <h2>📖 Origin Story & Backstory</h2>
        <textarea className="rText" value={bStory} onChange={(e) => setBStory(e.target.value)} />
      </section>

      <section className="form-section">
        <h2>⚔️ Legendary Battles & Achievements</h2>
        {battles.map((battle, index) => (
          <div className="field-list" key={index}>
            <input type="text" className="rinput" value={battle} onChange={(e) => {
              const updated = [...battles];
              updated[index] = e.target.value;
              setBattles(updated);
            }} />
            <button onClick={() => {
              if (battles.length > 1) {
                const updated = [...battles];
                updated.splice(index, 1);
                setBattles(updated);
              }
            }} className="btn remove">Remove</button>
          </div>
        ))}
        <button onClick={() => setBattles([...battles, ''])} className="btn add">+ Add Battle</button>
      </section>

      <section className="form-section">
        <h2>⚠️ Known Limitations & Weaknesses</h2>
        {weak.map((weaks, index) => (
          <div className="field-list" key={index}>
            <input type="text" className="rinput" value={weaks} onChange={(e) => {
              const updated = [...weak];
              updated[index] = e.target.value;
              setWeak(updated);
            }} />
            <button onClick={() => {
              if (weak.length > 1) {
                const updated = [...weak];
                updated.splice(index, 1);
                setWeak(updated);
              }
            }} className="btn remove">Remove</button>
          </div>
        ))}
        <button onClick={() => setWeak([...weak, ''])} className="btn add">+ Add Weakness</button>
      </section>

      <section className="form-section">
        <h2>🔑 Preferred Roles & Positions</h2>
        <div className="field-list">
          <input type="text" className="rinput" value={pRole} onChange={(e) => setProle(e.target.value)} />
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

      <button onClick={handleUpdate} className="btn submit">Update Profile</button>
    </div>
  );
};

export default HeroProfileEdit;
