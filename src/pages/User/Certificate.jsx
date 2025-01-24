import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getCertifiedDetailsAPI } from '../../api/user';
import { AcademicCapIcon } from '@heroicons/react/16/solid';
import html2pdf from 'html2pdf.js'

const Certificate = () => {

const [certificate, setCertificate] = useState(null);
  const [error, setError] = useState(null);

  const user = useSelector((state) => state.user);
  console.log(user, 'user');

  const downloadCertificate = () => {
    const element = document.getElementById('certificate-container');
    const options = {
      margin: 0.5,
      filename: `${certificate.userId.name}-certificate.pdf`,
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 4 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };
    
    // Adding a callback to detect if the download is successful
    html2pdf().from(element).set(options).toPdf().get('pdf').then((pdf) => {
      if (pdf) {
        console.log("PDF generated successfully.");
      } else {
        console.error("Error generating PDF.");
      }
    }).save();
  };
  

  useEffect(() => {
    if (user?.userId) { 
        const id = user.userId
        console.log(user.userId, 'idddd');
        // Check if userId is available
      const fetchCertificate = async () => {
        try {
          const response = await getCertifiedDetailsAPI(id);
          console.log(response.data.data, 'response.data.data');
          setCertificate(response.data.data);
        } catch (err) {
          console.error("Error fetching certificate:", err);
          setError("Failed to load certificate");
        }
      };

      fetchCertificate();
    }
  }, [user?.userId]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!certificate) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-6">
      <div id="certificate-container" className="w-full max-w-3xl bg-gradient-to-r from-gray-500 to-indigo-500 shadow-2xl rounded-lg p-8">
        {/* Certificate Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-black">Certificate of Completion</h1>
        </div>

        {/* Certificate Details */}
        <div className="text-center mb-8">
        <p className="text-xl text-gray-200 mt-2">This certifies that</p>
          <p className="text-3xl font-bold text-white">{certificate.userId.name}</p>
          <p className="text-xl text-gray-200 mt-2">has successfully completed the course</p>
          <h2 className="text-3xl font-bold text-black mt-4 capitalize">{certificate.courseId.title}</h2>
        </div>

        <div className="flex justify-between mb-6">
          <p className="text-lg text-gray-100">Score: {certificate.score} / {certificate.totalMarks}</p>
          <p className="text-lg text-gray-100">Percentage: {certificate.percentage}%</p>
        </div>

        {/* Issued Date */}
        <div className="text-center mt-4">
          <p className="text-lg text-gray-200">Issued on: {new Date(certificate.issuedAt).toLocaleDateString()}</p>
        </div>

        {/* Signature Section */}
        <div className="mt-12 border-t pt-4 text-center">
          <p className="text-lg text-gray-300">Authorized Institute</p>
          <div className="flex justify-center mt-4">
            <div className="flex items-center space-x-3">
              <AcademicCapIcon className="h-8 w-8 text-black" />
              <h2 className="px-3 py-2 font-bold text-2xl text-black">BRAIN BOOSTER</h2>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center mt-8 space-x-4">
          <button 
            className="bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition"
            onClick={downloadCertificate}// Placeholder for download
          >
            Download Certificate
          </button>
        </div>
      </div>
    </div>
  );
};

export default Certificate
