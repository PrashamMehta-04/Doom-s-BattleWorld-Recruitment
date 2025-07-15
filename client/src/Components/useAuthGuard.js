// useAuthGuard.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStoreValue } from 'pulsy';
import './authStore';

const useAuthGuard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getStoreValue('auth')?.token;

    if (!token) {
      navigate('/login');
      return;
    }

    fetch('http://localhost:5000/api/validate', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then(res => {
      if (!res.ok) throw new Error('Invalid token');
      return res.json();
    })
    .then(data => {
      console.log("User is authenticated:", data.user);
    })
    .catch(err => {
      console.log("Redirecting to login:", err.message);
      navigate('/login');
    });
  }, []);
};

export default useAuthGuard;
