import React, { useRef } from 'react';
import { Box, Typography, Button } from '@mui/material';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// import images
import bg from "./Assets/bg.png";
import logo from "./Assets/logo.png";
import sign from "./Assets/sign.png";
import batch from "./Assets/batch.png";

const Certificate = ({ name, description, certificateId, date }) => {
  const certificateRef = useRef();

  const downloadCertificate = () => {
    const certificateElement = certificateRef.current;
    
    // Use higher scale for better resolution and correct scroll positioning
    html2canvas(certificateElement, {
      scale: 3,  // Increase scale for higher resolution
      useCORS: true,  // Allow cross-origin images
      scrollX: 0,
      scrollY: 0,
      windowWidth: document.documentElement.offsetWidth,
      windowHeight: document.documentElement.offsetHeight,
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      
      // PDF dimensions matching A4 size in landscape
      const pdf = new jsPDF('landscape', 'mm', 'a4');
      
      // Convert canvas dimensions to PDF page dimensions
      const imgWidth = 297;  // A4 landscape width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio
      
      // Add padding to ensure borders are not cropped
      const padding = 10; // Adjust padding as needed
      const pdfWidth = imgWidth - 2 * padding;
      const pdfHeight = imgHeight - 2 * padding;
      
      // Add the image to the PDF with padding
      pdf.addImage(imgData, 'PNG', padding, padding, pdfWidth, pdfHeight);
      
      // Save the PDF
      pdf.save(`certificate_${name}.pdf`);
    });
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      {/* Certificate Box */}
      <Box
        ref={certificateRef}
        sx={{
          width: '880px',   // Adjust width of the certificate box
          height: '600px',  // Adjust height of the certificate box
          padding: '40px',
          border: '3px solid #FF5722',  // Border for the certificate
          borderRadius: '20px',
          position: 'relative',
          textAlign: 'center',
          backgroundColor: '#fff',
          margin: '0 auto',
          fontFamily: 'Arial, sans-serif',
          boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2)',  
          backgroundImage: {bg},  // Path to the watermark image
          backgroundSize: 'contain',  // Adjust size of the watermark
          backgroundRepeat: 'no-repeat',  // Prevent repeating the watermark
          backgroundPosition: 'center',
        }}
      >
       {/* Logo and Tublian Text in Flex Container */}
       <Box sx={{ display: 'flex', alignItems: 'center', position: 'absolute', top: '20px', left: '20px' }}>
          {/* Tublian Logo */}
          <img
            src={logo}
            alt="Tublian Logo"
            style={{ width: '50px', marginRight: '10px' }}
          />
          {/* Tublian Text */}
          <Typography variant="h5" sx={{ color: '#FF5722', fontWeight: 'bold', fontFamily: 'Poppins, Arial, sans-serif', letterSpacing: '5px' }}>
          TUBLIAN
          </Typography>
        </Box>
        {/* Main Title */}
        <Typography variant="h3" sx={{ fontWeight: 'bold', marginTop: '80px', textAlign:'left', color: 'black', fontFamily: 'Inter, Arial, sans-serif', fontSize: '42.6px' }}>
        CERTIFICATE
        </Typography>
        <Typography variant="h5" sx={{ color: '#FC3946', fontStyle: 'medium', marginBottom: '40px', textAlign:'left',fontFamily: 'Poppins, Arial, sans-serif', letterSpacing:'2px' }}>
          OF INTERNSHIP
        </Typography>

        {/* Student Name */}
        <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center', marginTop: '40px', fontFamily: 'Poppins, Arial, sans-serif' }}>
          {name || 'Yoosuf Aathil'}
        </Typography>
        <Box sx={{ borderBottom: '2px solid #FD642E', width: '80%', marginBottom: '20px'}}></Box>


        {/* Certificate Description */}
        <Typography sx={{ color: '#000', fontSize: '16px', lineHeight: '1', marginBottom: '10px', textAlign: 'left', fontFamily: 'Poppins, Arial, sans-serif' }}>
          {description ? description.split('\n')[0] : 'successfully completed the 4-Week AI Internship Program at Tublian,'}
        </Typography>
        <Typography sx={{ color: '#000', fontSize: '16px', lineHeight: '1.6', marginBottom: '10px', textAlign: 'left', fontFamily: 'Poppins, Arial, sans-serif' }}>
          {description ? description.split('\n')[1] : 'demonstrating exceptional dedication and a commendable work ethic'}
        </Typography>
        <Typography sx={{ color: '#000', fontSize: '16px', lineHeight: '1.6', marginBottom: '10px', textAlign: 'left', fontFamily: 'Poppins, Arial, sans-serif' }}>
          {description ? description.split('\n')[2] : 'throughout the internship. The contributions made, including the'}
        </Typography>
        <Typography sx={{ color: '#000', fontSize: '16px', lineHeight: '1.6', marginBottom: '30px', textAlign: 'left', fontFamily: 'Poppins, Arial, sans-serif' }}>
          {description ? description.split('\n')[3] : 'development of an advanced chatbot, have added significant value to the AI community.'}
        </Typography>

        {/* Signature and Title */}
        <Box sx={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
          <img src={sign} alt="Signature" style={{ width: '150px', marginBottom: '10px' }} />
          <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '5px', fontFamily: 'Poppins, Arial, sans-serif' }}>
            Nilanjan Raychaudhuri
          </Typography>
          <Typography variant="body1" sx={{ color: '#999', fontFamily: 'Poppins, Arial, sans-serif' }}>
            Founder - Tublian
          </Typography>
        </Box>

        {/* Certificate ID and Date */}
        <Box sx={{ position: 'absolute', bottom: '20px', right: '20px', textAlign: 'right', display: 'flex', alignItems: 'center' }}>
          <img src={batch} alt="Batch" style={{ width: '50px', marginRight: '10px' }} />
          <Box sx={{ textAlign: 'left' }}>
            <Typography variant="body1" sx={{ color: '#FF5722', fontWeight: 'bold', marginBottom: '5px', fontFamily: 'Poppins, Arial, sans-serif' }}>
              CERTIFIED
            </Typography>
            <Typography variant="body2" sx={{ color: '#555', fontFamily: 'Poppins, Arial, sans-serif' }}>
           {certificateId || 'abcd-1234'}
            </Typography>
            <Typography variant="body2" sx={{ color: '#555', fontFamily: 'Poppins, Arial, sans-serif' }}>
            {date || '10/19/2024'}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Download Button (Outside Certificate) */}
      <Button
        variant="contained"
        
        onClick={downloadCertificate}
        sx={{ marginTop: '20px' , backgroundColor: '#FF5722', color: '#fff', fontFamily: 'Poppins, Arial, sans-serif', letterSpacing: '1px' }}
      >
        Download
      </Button>
    </div>
  );
};

export default Certificate;
