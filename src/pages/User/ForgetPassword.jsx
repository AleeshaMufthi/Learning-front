
import React, { useState, useEffect } from 'react'
import { forgetPasswordAPI } from '../../api/user'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';

// import { verifyOtpAPI } from '../../api/user';
import OtpPass from '../../components/common/OtpPass';
import { useDispatch } from 'react-redux';
import { setUser } from '../../feautures/userSlice';
import Logo from '../../components/common/Logo';

export default function ForgetPassword() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(""); // Stores the OTP value
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false); // Track OTP verification status
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [timer, setTimer] = useState(60);
  const [otpSection, setOtpSection] = useState(false);

  const navigate = useNavigate();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      // Send OTP to email
      dispatch(setUser({email}));
      await forgetPasswordAPI({ email });
      setOtpSent(true);
      toast.success("OTP sent to your email.");
      setTimer(60)
    } catch (error) {
      toast.error("Email is not registered");
      setError(error.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (otpValue) => {
    setOtp(otpValue); // Update the OTP state when it changes in the OtpPass component
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();

    if (!otp) {
        setErrorMessages({ global: "Please enter OTP." });
        return;
    }

    if (otp && otp.length === 6) {
        try {
            setIsLoading(true);
            setOtpVerified(true);
            toast.success("OTP verified successfully.");
            navigate("/resetPassword", { state: { email } });

            setTimer(60);
            setTimeout(() => {
                setIsLoading(false);
                setOtpSection(true);
            }, 1000);
        } catch (err) {
            // Handle error
            console.error("Error in handleOtp", err);
            console.log("Error Response:", err.response);
            setError(err.response?.data?.errors?.message || "An error occurred");
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
        }
    } else {
        setError("Please enter a valid OTP.");
    }
};

  const handleResendOtp = async () => {
    try{
       setIsLoading(true)
       await forgetPasswordAPI({email})
       toast.success("OTP resend to your email")
       setTimer(60)
    }catch(error){
       toast.error("Failed to resend OTP")
    }finally{
      setIsLoading(false)
    }
  }

  useEffect(() => {
    let interval;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setTimer(null);
    }

    return () => clearInterval(interval);
  }, [timer]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-300">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
      <h2 className='px-6 py-6 text-center nexa-font font-bold text-gray-800'>BRAIN BOOSTER</h2>
       <h2 className="text-3xl font-bold text-center">Forgot Password</h2>
       {!otpSent && (
        <form onSubmit={handleEmailSubmit} className="w-full max-w-sm">
          <div className="mb-4 pt-5">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700 focus:outline-none"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send OTP"}
          </button>
        </form>
      )}

      {otpSent && !otpVerified && (
        <div>
          <OtpPass onOtpChange={handleOtpChange} />
          <button
            onClick={handleOtpSubmit}
            className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-800 focus:outline-none mt-4"
          >
            Verify OTP
          </button>
        </div>
        
      )}

      {otpVerified && (
        <div>
          <p>OTP Verified! Redirecting...</p>
        </div>

      )}
{otpSent && !otpVerified && (
       <div className="flex items-center justify-between mt-2">
                <span
                  onClick={() => {
                    setOtpSection(false);
                    setIsLoading(false);
                  }}
                  className="block font-semibold text-indigo-600 hover:text-indigo-500 cursor-pointer"
                >
                  Back
                </span>
                <div className="text-sm">
                  <div className="font-semibold text-indigo-600 hover:text-indigo-500">
                    {timer ? (
                      <>Resend OTP in {timer} seconds</>
                    ) : (
                      <button onClick={ handleResendOtp }>Resend OTP</button>
                    )}
                  </div>
                </div>
              </div>
              )}
            </div>
          </div>
  );
}

