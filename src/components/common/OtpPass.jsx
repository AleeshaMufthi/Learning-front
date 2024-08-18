import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // provides a way to validate the props
import { userOtpSendAPI, resendOtp } from '../../api/user';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const OtpPass = ({ onOtpChange }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const inputRefs = useRef([]);

  const [otpValues, setOtpValues] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [otpSection, setOtpSection] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Timer handling
  useEffect(() => {
    let interval = null;
    if (otpSection && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpSection, timer]);

  const handleOtpChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;  // Ensure input is numeric
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);
    if (onOtpChange) {
      onOtpChange(newOtpValues.join(''));
    }
    if (value !== '' && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handling backspace key navigation
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && index > 0 && otpValues[index] === '') {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleOtpSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();

    const otp = otpValues.join('');
    const otpPayload = { otp, email };

    userOtpSendAPI(otpPayload)
      .then((data) => {
        console.log(data);
        setTimeout(() => {
          setIsLoading(false);
          navigate('../signin?new=true');
        }, 1000);
      })
      .catch((err) => {
        // Clear previous error message if any
        setError("");
  
        // Handle specific error response from backend
        if (err.response?.data?.errors?.message) {
          toast.error(err.response.data.errors.message);
          setError(err.response.data.errors.message);
        } else {
          toast.error("An unexpected error occurred. Please try again.");
          setError("An unexpected error occurred. Please try again.");
        }
  
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      });
  };

  const handleResendOtp = () => {
    setIsLoading(true);
    resendOtp({ email }) 
      .then((response) => {
        toast.success('OTP has been resent successfully',response.message);
        setTimer(60);
      })
      .catch((error) => {
        console.error('Error resending OTP:', error.response || error.message);
        toast.error('Failed to resend OTP. Please try again.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-xl w-full">
        <div className="flex flex-col items-center">
          <div className="w-full p-8 text-center">
            <h1 className="text-3xl font-bold text-green-600">Help Desk OTP</h1>
            <div className="h-1 w-16 bg-green-600 my-4 mx-auto" />
            <form className="space-y-4" onSubmit={handleOtpSubmit}>
              <div className="flex flex-col items-center space-y-4">
                <p className="text-center">One-time Password</p>
                <div className="flex space-x-2">
                  {otpValues.map((value, index) => (
                    <input
                      key={index}
                      type="tel"
                      inputMode="numeric"
                      maxLength="1"
                      pattern="[0-9]"
                      value={value}
                      onChange={(e) => handleOtpChange(e.target.value, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      ref={(el) => (inputRefs.current[index] = el)}
                      className="w-10 h-10 text-center border border-gray-300 rounded focus:outline-none focus:border-green-600"
                      required
                    />
                  ))}
                </div>
              </div>
              <button
                type="submit"
                className={`w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={isLoading}
              >
                {isLoading ? 'Verifying...' : 'Verify'}
              </button>
              {error && <p className="text-red-500 mt-2">{error}</p>}
              <Link
                href="#"
                className="text-sm text-green-600 hover:underline"
                onClick={handleResendOtp}
              >
                Resend OTP
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

OtpPass.propTypes = {
  onOtpChange: PropTypes.func,
};

export default OtpPass;
