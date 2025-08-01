import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import '../Components_CSS/Doom_Reviewc.css';
import { useNavigate } from 'react-router-dom';
import { getStoreValue } from 'pulsy';
const Doom_Review = () => {
  const cardRef = useRef(null);
  const [startX, setStartX] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [accepted, setAccepted] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [heroData, setHeroData] = useState([]);
  const title=localStorage.getItem('Title');
  const navigate = useNavigate();
  const username=getStoreValue('auth')?.user?.username;
  useEffect(() => {
    axios.get(`http://localhost:5000/api/heroes?name=${title}`)
      .then(res => setHeroData(res.data))
      .catch(err => console.error("Error fetching heroes:", err));
  }, []);

  const handleStart = (e) => {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    setStartX(clientX);
  };
   const update=async(username,status)=>{
        const response =await fetch(`http://localhost:5000/api/hero-update`,{
          method:'POST',
          headers:{
          'Content-Type':'application/json',},
          body:JSON.stringify({username,status,title})
        });
        if(response.ok){
          console.log("Accepted/Rejected");
        }
        else{
          console.log("Failed to update!!!");
        }
      }

  const handleEnd = (e) => {
    if (startX === null) return;
    const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    const diffX = endX - startX;
    const card = cardRef.current;
    if (!card) return;

    if (diffX > 100) {
      card.style.transform = 'translateX(150%) rotate(10deg)';
      card.style.transition = 'transform 0.4s ease';
      setAccepted([...accepted, heroData[currentIndex]]);
      console.log(heroData[currentIndex].Username);
      update(heroData[currentIndex].Username,'Accepted');
     
      nextCard();
    } else if (diffX < -100) {
      card.style.transform = 'translateX(-150%) rotate(-10deg)';
      card.style.transition = 'transform 0.4s ease';
      setRejected([...rejected, heroData[currentIndex]]);
      console.log(heroData[currentIndex].Username);
      update(heroData[currentIndex].Username,'Rejected');
      nextCard();
    } else {
      card.style.transform = 'translateX(0)';
    }
    setStartX(null);
  };

  const nextCard = () => {
    setTimeout(() => {
      const card = cardRef.current;
      if (card) {
        card.style.transition = 'none';
        card.style.transform = 'translateX(0)';
      }
      setCurrentIndex((prev) => prev + 1);
    }, 400);
  };

  if (heroData.length === 0) {
    return <div className="swipe-card">Loading...</div>;
  }

  // if (currentIndex >= heroData.length) {
  //   return (
  //     <div className="swipe-card finished">
  //       <h2>No More Cards</h2>
  //       <p>✅ Accepted: {accepted.length} | ❌ Rejected: {rejected.length}</p>
  //     </div>
  //   );
  // }
  if (currentIndex >= heroData.length) {
  return (
    <div className="swipe-card finished">
      <h2>No More Cards</h2>
      <p>✅ Accepted: {accepted.length} | ❌ Rejected: {rejected.length}</p>
      <button className="back-home-button" onClick={() => navigate('/doom')}>
        🔙 Back to Home
      </button>
    </div>
  );
}


  const currentHero = heroData[currentIndex];
  console.log(currentHero.Resume);
  const rawUrl = currentHero.Resume;
  let downloadUrl='';
  if(rawUrl!=null){
 downloadUrl = rawUrl.replace(
  '/upload/',
  '/upload/fl_attachment/'
);
}
if(username=='Doom007'){
  return (
    <div
      className="swipe-card"
      ref={cardRef}
      onTouchStart={handleStart}
      onTouchEnd={handleEnd}
      onMouseDown={handleStart}
      onMouseUp={handleEnd}
    >
      <img
        src={`https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${currentHero.Username}`}
        alt={currentHero.Username}
        className="card-image"
      />
      <h2>🌟 Hero Resume</h2>
      <h3>{currentHero.Username}</h3>

      <p><strong>Backstory:</strong> {currentHero.BackStory}</p>

      <p><strong>Powers:</strong></p>
      <ul>
        {currentHero.SuperPower?.map((power, i) => <li key={i}>{power}</li>)}
      </ul>

      <p><strong>Weaknesses:</strong></p>
      <ul>
        {currentHero.Weakness?.map((weakness, i) => <li key={i}>{weakness}</li>)}
      </ul>

      <p><strong>Key Battles:</strong></p>
      <ul>
        {currentHero.keyBattles?.map((battle, i) => <li key={i}>{battle}</li>)}
      </ul>

      <p><strong>Preferred Role:</strong> {currentHero.preferredRole}</p>

      {currentHero.Resume && (
        <a
          href={downloadUrl}
          className="download-button"
          target="_blank"
          rel="noopener noreferrer"
          download
        >
          📄 Download Resume
        </a>
      )}
    </div>
  );
};
}

export default Doom_Review;
