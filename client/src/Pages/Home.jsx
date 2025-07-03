import React, { useState } from 'react';
import Login_Button from '../Components/Login_Button';
import Navbar from '../Components/Navbar';
import FeatureBox from '../Components/Feature_Box';
import circleUser from '../Components_CSS/circle-user.svg';
import calender from '../Components_CSS/calendar.svg';
import msg from '../Components_CSS/message-square.svg';
import search from '../Components_CSS/search-check.svg';
import { GoogleLogin } from '@react-oauth/google';

const Home = () => {
  const [showGoogle, setShowGoogle] = useState(true);

  return (
    <div>
      <Navbar />
      <h1>BattleWorld Awaits!</h1>
      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
        <Login_Button text="Login as Marvel Hero" onClick={() => setShowGoogle(true)} />
        <Login_Button text="Login as Doom" />
      </div>
      {showGoogle && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
          <GoogleLogin
            onSuccess={credentialResponse => {
              console.log(credentialResponse);
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          />
        </div>
      )}
      <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', marginTop: '32px' }}>
        <FeatureBox
          title="Create a heroic profile"
          description="Showcase your powers and abilities to stand out"
          icon={circleUser}
        />
        <FeatureBox
          title="Apply to multiversal jobs"
          description="Find missions across dimensions and realities"
          icon={search}
        />
        <FeatureBox
          title="Chat with recruiters"
          description="Direct communication with Doom and other recruiters"
          icon={msg}
        />
        <FeatureBox
          title="Schedule interviews"
          description="Meet through interdimensional portals and calendars"
          icon={calender}
        />
      </div>
    </div>
  )
}
export default Home;