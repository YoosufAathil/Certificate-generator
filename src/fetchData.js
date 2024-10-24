import { courses } from './Courses';

// Helper function to generate a unique 4-digit number
const generateUniqueNumber = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

// Helper function to generate the Certificate ID
const generateCertificateId = (username) => {
  const uniqueNumber = generateUniqueNumber();
  return `8020-${username}-${uniqueNumber}`;
};

export const fetchData = async (username, courseId) => {
  // Check if a date already exists in local storage
  let date = localStorage.getItem(`certificateDate-${courseId}`);
  if (!date) {
    // Generate a new date if it doesn't exist
    date = new Date().toLocaleDateString();
    localStorage.setItem(`certificateDate-${courseId}`, date);
  }

  // Check if a certificate ID already exists in local storage
  let certificateId = localStorage.getItem(`certificateId-${courseId}`);
  if (!certificateId) {
    // Generate a new certificate ID if it doesn't exist
    certificateId = generateCertificateId(username);
    localStorage.setItem(`certificateId-${courseId}`, certificateId);
  }

  // Find the course by ID
  const course = courses.find(c => c.id === parseInt(courseId));

  return {
    name: username,
    description: course ? course.description : 'Course description not found.',
    certificateId: certificateId,
    date: date
  };
};