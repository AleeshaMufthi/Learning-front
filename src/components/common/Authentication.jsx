import React from 'react'

const Authentication = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-6xl w-full flex">
      
      <div className="relative w-1/2">
        <div className="absolute inset-0 bg-white bg-opacity-50 flex flex-col items-center justify-center p-4">
          <h3 className="text-lg font-extrabold text-gray-700 mb-2">BRAIN BOOSTER...</h3>
          <p className='text-gray-500 font-normal ml-5 mr-5'>What is BRAIN BOOSTER? An innovative E-learning platform designed to provide engaging educational experiences. It offers a wide range of courses across various subjects, tailored to enhance learners' skills.</p>
        </div>
        <img src="src\assets\login-page-img.webp" alt="Background" className="object-cover w-full h-full" />
      </div>
    </div>
  </div>
  )
}

export default Authentication

