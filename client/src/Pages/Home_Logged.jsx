import React, { useState, useEffect } from 'react';
import Navbar_Login from '../Components/Navbar_Login';
import Welcome from '../Components/Welcome';
import Making_Profile from '../Components/making_Profile';
import Job_Cards from '../Components/Job_Cards';
import useAuthGuard from '../Components/useAuthGuard';
import { getStoreValue } from 'pulsy';
import { useNavigate } from 'react-router-dom';
import JobList from '../Components/Job_List';
import '../Components_CSS/home_logged_search.css';

const Home_Logged = () => {
  const navigate = useNavigate();
  useAuthGuard();

  const [jobs, setJobs] = useState([]);
  const [len, setLen] = useState(0);
  const [res, setRes] = useState(0);
  const [profile, setProfile] = useState();
  const [allJobs, setAllJobs] = useState([]);
  const [search, setSearch] = useState('');
  const token = getStoreValue('auth')?.token;

  useEffect(() => {
    const complete = async () => {
      try {
        const response2 = await fetch('http://localhost:5000/api/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        });
        if (response2.ok) {
          setProfile(<Making_Profile />);
        }
      } catch (error) {
        console.log('Profile Error!', error);
      }
    };

    const fetchCards = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/cards', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        });

        if (response.ok) {
          const { data, result } = await response.json();
          const set = new Set(result);
          setLen(data.length);
          setRes(data.length - set.size);

          const filtered = data.filter(job => !set.has(job.companyName));
          setJobs(filtered);
          setAllJobs(filtered);
        } else {
          console.log("Failed to fetch");
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    complete();
    fetchCards();
  }, []);

  useEffect(() => {
    const term = search.trim().toLowerCase().replace(/\s+/g, '');
    if (term.length > 0) {
      const filtered = allJobs.filter(job =>
        job.companyName.toLowerCase().replace(/\s+/g, '').includes(term)
      );
      setJobs(filtered);
    } else {
      setJobs(allJobs);
    }
  }, [search, allJobs]);

  const Name = localStorage.getItem('Name');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', height: "auto" }}>
      <Navbar_Login />
      <Welcome name={Name} jobs={len} availableJobs={res} />
      <div>{profile}</div>
      <p style={{ textAlign: 'left', marginLeft: '25px', fontSize: "20px", fontWeight: 'bold' }}>Recommended Jobs</p>

      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <JobList jobs={jobs.map((job, i) => (
        <Job_Cards
          key={i}
          Title={job.companyName}
          subTitle={job.subTitle}
          item1={job.lastDate}
          item2={job.salary}
          item3={job.location}
        />
      ))} />
    </div>
  );
};

export default Home_Logged;
