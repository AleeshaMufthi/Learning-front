import { useState } from "react";
import { resetPasswordAPI } from "../../api/user";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import {  useSelector } from "react-redux";

export default function ResetPassword() {

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const email = useSelector((state) => state.user.email);

    const navigate = useNavigate()

    console.log(email, 'email from selector');
    
  
    const handlePasswordReset = (e) => {
      e.preventDefault();
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      resetPasswordAPI({ email, password })
        .then(() => {
          toast.success("Password reset successfully! You can now log in with your new password.");
          setSuccess(true);
          setPassword(""); 
          setConfirmPassword("");
          
          navigate("/signin");
        })
        .catch((err) => {
          if (err.response && err.response.data && err.response.data.error) {
            // Specific error message from backend
            toast.error(err.response.data.error);
        } else {
            // Fallback error messages
            toast.error("No response received from the server. Please try again.");
            toast.error("An error occurred while setting up the request.");
        }
        });
    };

    return (
      <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Toaster />
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
      <h2 className='px-6 py-6 text-center nexa-font font-bold text-gray-800'>BRAIN BOOSTER</h2>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Reset Your Password
        </h2>
        <form onSubmit={handlePasswordReset} className="space-y-4">
          <div>
            <input
              type="password"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lime-950"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lime-950"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-800"
          >
            Reset Password
          </button>
        </form>
        {error && (
          <p className="mt-4 text-red-500 text-center">{error}</p>
        )}
        {success && (
          <p className="mt-4 text-gray-500 text-center">
            Password has been reset successfully!
          </p>
        )}
      </div>
    </div>
    </>
    );
  }