import React, { useState } from 'react';

const CertificateGenerator: React.FC = () => {
  const [studentName, setStudentName] = useState<string>('');
  const [courseName, setCourseName] = useState<string>('');
  const [certificateVisible, setCertificateVisible] = useState<boolean>(false);

  const generateCertificate = () => {
    // Certificate generation logic here
    setCertificateVisible(true);
    // Add logic to generate certificate image and trigger download
  };

  return (
    <div>
      <h1>Certificate Generator</h1>
      <input
        type="text"
        placeholder="Enter Student Name"
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Enter Course Name"
        value={courseName}
        onChange={(e) => setCourseName(e.target.value)}
      />
      <br />
      <button onClick={generateCertificate}>Generate Certificate</button>

      {certificateVisible && (
        <div>
          {/* Certificate content goes here */}
          {/* Adjust the following JSX to render the certificate */}
          <p>{studentName}</p>
          <p>{courseName}</p>
          {/* Add logic to render the certificate image */}
        </div>
      )}
    </div>
  );
};

export default CertificateGenerator;
