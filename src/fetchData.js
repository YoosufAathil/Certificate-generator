import { courses } from './Courses';

// Helper function to generate a unique 4-digit number
const generateUniqueNumber = () => {
  const timestamp = Date.now().toString(); // Get the current timestamp
  const randomNum = Math.floor(1000 + Math.random() * 9000).toString(); // Generate a random 4-digit number
  const uniqueNumber = timestamp.slice(-2) + randomNum.slice(0, 2); // Combine parts of the timestamp and random number
  return uniqueNumber;
};

// Helper function to generate the Certificate ID
const generateCertificateId = (username) => {
  const sanitizedUsername = username.toLowerCase().replace(/\s+/g, ''); // Remove spaces and convert to lowercase
  const uniqueNumber = generateUniqueNumber();
  return `8020-${sanitizedUsername}-${uniqueNumber}`;
};

export const fetchData = async (username, fullName, courseId) => {
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
    name: fullName,
    description: course ? course.description : 'Course description not found.',
    certificateId: certificateId,
    date: date
  };
};