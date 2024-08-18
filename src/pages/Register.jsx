import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { userOtpSendAPI, userSignUpAPI } from '../api/user'
import axios from 'axios'

const Register = () => {

  const navigate = useNavigate()

  const [ formValues, setFormValues ] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword:'',
  })

  // const [otpValues, setOtpValues] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const [timer, setTimer] = useState(60);
  // const [otpSection, setOtpSection] = useState(false);

  // useEffect(() => {
  //   let interval = null;
  //   if (otpSection && timer > 0) {
  //     interval = setInterval(() => {
  //       setTimer((prevTimer) => prevTimer - 1);
  //     }, 1000);
  //   }
  //   return () => clearInterval(interval);
  // }, [otpSection, timer]);

  const handleInputChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  // const handleOtpChange = (e) => {
  //   setOtpValues(e.target.value);
  // };

  // const handleOtp = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   setError("");
  //   try {
  //     const response = await userOtpSendAPI(formValues);
  //     console.log(response);

  //     if (response.data) {
  //       setOtpSection(true);
  //       setTimer(60);
  //     } else {
  //       setError(response.message || "Failed to send OTP.");
  //     }
  //   } catch (error) {
  //     setError("An error occurred. Please try again.");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleSignUp = (e) => {
    setIsLoading(true);
    e.preventDefault();
    
    userSignUpAPI(formValues)
      .then((data) => {
        console.log(data);
        setTimeout(() => {
          setIsLoading(false);
          // Redirect to OTP page after successful signup
          navigate("/sendotp",{state:{email:formValues.email}}); 
        }, 1000);
      })
      .catch((err) => {
        toast.error(err.response?.data?.errors.message);
        console.log("error", err.response);
        setError(err.message?.data?.errors.message);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-6xl w-full flex">
      <div className="w-1/2 p-8">
        <h1 className="text-3xl font-bold text-green-600">Create & Explore</h1>
        <div className="h-1 w-38 bg-green-600 my-4" />
        <form className="space-y-4">
        <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              NAME
            </label>
            <input 
            id="name"
            name='name' 
            type="text" 
            value={formValues.name}
            onChange={handleInputChange}
            placeholder="Enter your Name" 
            className="mt-1" 
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              E-MAIL
            </label>
            <input 
            id="email" 
            name='email'
            type='email'
            value={formValues.email}
            onChange={handleInputChange}
            placeholder="Enter your email" 
            className="mt-1" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              PASSWORD
            </label>
            <input 
            id="password" 
            name='password'
            type="password" 
            value={formValues.password}
            onChange={handleInputChange}
            placeholder="Enter your password" 
            className="mt-1" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              CONFIRM PASSWORD
            </label>
            <input 
            id="password"
            name='confirmPassword' 
            type="password"
            value={formValues.confirmPassword}
            onChange={handleInputChange} 
            placeholder="Confirm your password" 
            className="mt-1" />
          </div>

          
                {/* <button type="submit"   onClick={handleSignUp} className="w-full h-8 bg-green-600 text-white rounded-lg">
                  {isLoading ? 'Processing...' : 'Sign Up'}
                </button>
                <p className="text-sm text-gray-600 text-center">
                  {timer > 0 ? `Resend OTP in ${timer}s` : 'Resend OTP'}
                </p> */}
           
              <button
                type="submit"
                className="w-full h-8 bg-green-600 text-white rounded-lg"
                disabled={isLoading}
                onClick={handleSignUp}
              >
                {isLoading ? 'Processing...' : 'Send OTP'}
              </button> 


            {error && <p className="text-red-600 text-center">{error}</p>}
            <p className="text-sm text-gray-600 text-center">Already have an account?</p>
            <Link to="/signin" className="block text-sm text-center text-green-600 hover:underline">
              Sign In now
            </Link>
          </form>
        </div>
        <div className="relative w-1/2">
          <div className="absolute inset-0 bg-white bg-opacity-50 flex flex-col items-center justify-center p-4">
            <h3 className="text-lg font-extrabold text-gray-700 mb-2">BRAIN BOOSTER...</h3>
            <p className="text-gray-500 font-normal ml-5 mr-5">
              What is BRAIN BOOSTER? An innovative E-learning platform designed to provide engaging educational experiences. It offers a wide range of courses across various subjects, tailored to enhance learners' skills.
            </p>
          </div>
          <img src="src/assets/login-page-img.webp" alt="Background" className="object-cover w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default Register
