import React, { useRef, useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { fetchData } from './fetchData'; // Import the fetchData function

// Import images
import bg from './Assets/bg.png';
import logo from './Assets/logo.png';
import signature from './Assets/sign.png';
import batch from './Assets/batch.png';

const Certificate = ({ username, fullName }) => {
  const { courseId } = useParams();
  const certificateRef = useRef();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [certificateId, setCertificateId] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const getData = async () => {
      const data = await fetchData(username, fullName, courseId);
      setName(data.name);
      setDescription(data.description);
      setCertificateId(data.certificateId);
      setDate(data.date);
    };

    getData();
  }, [username, fullName, courseId]);

  const downloadCertificate = () => {
    const certificateElement = certificateRef.current;

    html2canvas(certificateElement, {
      scale: 3,
      useCORS: true,
      scrollX: 0,
      scrollY: 0,
      windowWidth: document.documentElement.offsetWidth,
      windowHeight: document.documentElement.offsetHeight,
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape', 'mm', 'a4');
      const imgWidth = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const padding = 10;
      const pdfWidth = imgWidth - 2 * padding;
      const pdfHeight = imgHeight - 2 * padding;
      pdf.addImage(imgData, 'PNG', padding, padding, pdfWidth, pdfHeight);
      pdf.save(`certificate_${name}.pdf`);
    });
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <Box
        ref={certificateRef}
        sx={{
          width: '880px',
          height: '600px',
          padding: '40px',
          border: '3px solid #FF5722',
          borderRadius: '20px',
          position: 'relative',
          textAlign: 'center',
          backgroundColor: '#fff',
          margin: '0 auto',
          fontFamily: 'Arial, sans-serif',
          boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2)',
          backgroundImage: `url(${bg})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', position: 'absolute', top: '20px', left: '20px' }}>
          <img src={logo} alt="Tublian Logo" style={{ width: '50px', marginRight: '10px' }} />
          <Typography variant="h5" sx={{ color: '#FF5722', fontWeight: 'bold', fontFamily: 'Poppins, Arial, sans-serif', letterSpacing: '0.5px' }}>
            TUBLIAN
          </Typography>
        </Box>
        <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'black', fontFamily: 'Inter, Arial, sans-serif', fontSize: '42.6px', textAlign: 'left', marginTop: '80px', marginLeft: '20px' }}>
          CERTIFICATE
        </Typography>
        <Typography variant="h5" sx={{ color: '#FC3946', fontStyle: 'medium', marginBottom: '40px', textAlign: 'left', fontFamily: 'Poppins, Arial, sans-serif', letterSpacing: '2px', marginLeft: '20px' }}>
          OF INTERNSHIP
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'left', marginTop: '40px', fontFamily: 'Poppins, Arial, sans-serif', marginLeft: '20px' }}>
          {name}
        </Typography>
        <Box sx={{ borderBottom: '2px solid #FD642E', width: '80%', marginBottom: '20px', marginLeft: '20px' }}></Box>
        {description.split('\n').map((line, index) => (
          <Typography key={index} sx={{ color: '#777', fontSize: '16px', lineHeight: '1.6', marginBottom: '10px', textAlign: 'left', fontFamily: 'Poppins, Arial, sans-serif', marginLeft: '20px' }}>
            {line}
          </Typography>
        ))}
        <Box sx={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', marginTop: '20px' }}>
          <img src={signature} alt="Signature" style={{ width: '150px', marginBottom: '10px' }} />
          <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '5px', fontFamily: 'Poppins, Arial, sans-serif' }}>
            Nilanjan Raychaudhuri
          </Typography>
          <Typography variant="body1" sx={{ color: '#999', fontFamily: 'Poppins, Arial, sans-serif' }}>
            Founder - Tublian
          </Typography>
        </Box>
        <Box sx={{ position: 'absolute', bottom: '20px', right: '20px', textAlign: 'right', display: 'flex', alignItems: 'center' }}>
          <img src={batch} alt="Batch" style={{ width: '50px', marginRight: '10px' }} />
          <Box sx={{ textAlign: 'left' }}>
            <Typography variant="body1" sx={{ color: '#FF5722', fontWeight: 'bold', marginBottom: '5px', fontFamily: 'Poppins, Arial, sans-serif' }}>
              CERTIFIED
            </Typography>
            <Typography variant="body2" sx={{ color: '#555', fontFamily: 'Poppins, Arial, sans-serif' }}>
             {certificateId}
            </Typography>
            <Typography variant="body2" sx={{ color: '#555', fontFamily: 'Poppins, Arial, sans-serif' }}>
             {date}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={downloadCertificate}
        sx={{ marginTop: '20px', fontFamily: 'Poppins, Arial, sans-serif', letterSpacing: '0.5px' }}
      >
        Download as PDF
      </Button>
    </div>
  );
};

export default Certificate;