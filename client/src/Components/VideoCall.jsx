import React, { useEffect, useRef } from 'react';
import {useNavigate} from 'react-router-dom';
const VideoCall = ({ roomName ,type}) => {
    const navigate=useNavigate();
  const jitsiContainerRef = useRef(null);

  useEffect(() => {
  const existingScript = document.querySelector('script[src="https://meet.jit.si/external_api.js"]');
  
  const loadJitsi = () => {
    const domain = 'meet.jit.si';
    const options = {
      roomName: roomName,
      width: '100%',
      height: '100%',
      parentNode: jitsiContainerRef.current,
    };
    const api = new window.JitsiMeetExternalAPI(domain, options);
    return api;
  };

  if (window.JitsiMeetExternalAPI) {
    const api = loadJitsi();
    return () => api.dispose();
  }

  if (!existingScript) {
    const script = document.createElement('script');
    script.src = 'https://meet.jit.si/external_api.js';
    script.async = true;
    script.onload = () => {
      const api = loadJitsi();
      return () => api.dispose();
    };
    document.body.appendChild(script);
  }
}, [roomName]);

  return <div ref={jitsiContainerRef} style={{ height: '625px' }} />;
};

export default VideoCall;