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
  const [url, setUrl] = useState('');
  const token = getStoreValue('auth')?.token;
  const navigate = useNavigate();
useEffect(() => {
  const fetchProfile = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/editprofile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setPowerArr(data.SuperPower || ['']);
      setBattles(data.Battles || ['']);
      setWeak(data.Weakness || ['']);
      setBStory(data.BackStory || '');
      setProle(data.PreferredRole || '');
      setUrl(data.ResumeURL || '');
    } catch (err) {
      console.error(err);
    }
  };
  fetchProfile();
}, [token]);


  const handleUpdate = async () => {
    const response = await fetch('http://localhost:5000/api/resume', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ powerArr, battles, weak, bStory, pRole, url })
    });
    if (response.ok) navigate('/home-logged');
  };

  return (
    <div className="base-container">
      <h1>Edit Your Hero Profile</h1>
      <p>Update your multiverse details</p>

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
        <h3 className="job-info-apply-title">Resume</h3>
        {url ? <a href={url} target="_blank" rel="noopener noreferrer">View Uploaded Resume</a> : <p>No resume uploaded.</p>}
      </div>

      <button onClick={handleUpdate} className="btn submit">Update Profile</button>
    </div>
  );
};

export default HeroProfileEdit;
