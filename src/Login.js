import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUsername }) => {
  const [username, setUsernameInput] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username) {
      setUsername(username);
      localStorage.setItem('username', username);
      navigate('/dashboard');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        padding: '20px',
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: '20px' }}>
        Login
      </Typography>
      <TextField
        label="Username"
        variant="outlined"
        value={username}
        onChange={(e) => setUsernameInput(e.target.value)}
        sx={{ marginBottom: '20px', width: '300px' }}
      />
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Login
      </Button>
    </Box>
  );
};

export default Login;