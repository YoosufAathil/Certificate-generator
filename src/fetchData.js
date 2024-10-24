
// export const fetchData = async () => {
//   // data fetching logic
//   const response = await fetch('https://api.example.com/certificate-data');
//   const data = await response.json();
//   return data;
// };

// Helper function to generate a unique 4-digit number
const generateUniqueNumber = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

// Helper function to generate the Certificate ID
const generateCertificateId = (username) => {
  const uniqueNumber = generateUniqueNumber();
  return `8020-${username}-${uniqueNumber}`;
};

export const fetchData = async () => {
  // Check if a date already exists in local storage
  let date = localStorage.getItem('certificateDate');
  if (!date) {
    // Generate a new date if it doesn't exist
    date = new Date().toLocaleDateString();
    localStorage.setItem('certificateDate', date);
  }

  // Dummy data for testing
  const username = 'yosufaathil';
  const certificateId = generateCertificateId(username);

  return {
    name: 'Yoosuf Aathil',
    description: `successfully completed the 4-Week AI Internship Program at Tublian,\ndemonstrating exceptional dedication and a commendable work ethic\nthroughout the internship. The contributions made, including the\ndevelopment of an advanced chatbot, have added significant value to the AI community.`,
    certificateId: certificateId,
    date: date
  };
};