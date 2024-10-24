import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import Certificate from './Certificate';

const App = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setUsername={setUsername} />} />
        <Route path="/dashboard" element={username ? <Dashboard username={username} /> : <Navigate to="/login" />} />
        <Route path="/certificate/:courseId" element={username ? <Certificate username={username} /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to={username ? "/dashboard" : "/login"} />} />
      </Routes>
    </Router>
  );
};

export default App;