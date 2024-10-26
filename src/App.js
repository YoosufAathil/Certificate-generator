import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import Certificate from './Certificate';

const App = () => {
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    // Clear local storage and navigate to login page on page reload
    localStorage.clear();
    setUsername('');
    setFullName('');
  }, []);

  const handleLogin = (username, fullName) => {
    setUsername(username);
    setFullName(fullName);
    localStorage.setItem('username', username);
    localStorage.setItem('fullName', fullName);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setUsername={handleLogin} />} />
        <Route path="/dashboard" element={username && fullName ? <Dashboard username={username} fullName={fullName} /> : <Navigate to="/login" />} />
        <Route path="/certificate/:courseId" element={username && fullName ? <Certificate username={username} fullName={fullName} /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to={username && fullName ? "/dashboard" : "/login"} />} />
      </Routes>
    </Router>
  );
};

export default App;