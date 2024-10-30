import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { courses } from './Courses';

const Dashboard = ({ username }) => {
  const navigate = useNavigate();

  const handleGenerateCertificate = (courseId) => {
    navigate(`/certificate/${courseId}`);
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" sx={{ marginBottom: '20px' }}>
        Welcome, {username}
      </Typography>
      <Typography variant="h5" sx={{ marginBottom: '20px' }}>
        Your Courses
      </Typography>
      {courses.map((course) => {
        const certificateId = localStorage.getItem(`certificateId-${course.id}`);
        return (
          <Box key={course.id} sx={{ marginBottom: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <Typography variant="h6" sx={{ marginBottom: '10px' }}>
              {course.title}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: '10px' }}>
              {course.description}
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: '10px' }}>
              Phases: {course.phases}
            </Typography>
            <Button variant="contained" color="primary" onClick={() => handleGenerateCertificate(course.id)}>
              {certificateId ? 'View Certificate' : 'Claim Certificate'}
            </Button>
          </Box>
        );
      })}
    </Box>
  );
};

export default Dashboard;