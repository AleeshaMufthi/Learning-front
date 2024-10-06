import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { googleAuthAPI } from "../../api/user";
import { setUser } from "../../feautures/userSlice";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";


const GoogleSignIn = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch()

  // Handle successful login
  const onSuccess = async (codeResponse) => {
    const { access_token } = codeResponse; // Extract the Google access token
    console.log("Google Access Token:", access_token);
    
    try {
      // Fetch user info from Google using the access token
      const userInfoResponse = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          Accept: 'application/json',
        },
      });
      const userInfo = await userInfoResponse.json();
      console.log("User Info:", userInfo);
      
      const { name, email } = userInfo; // Extract the email

      // Send the email to your backend for authentication
      const response = await googleAuthAPI({ name, email });

      if (response.status === 200) {
        console.log("Backend Response:", response.data);

        const { token, user } = response.data;

        localStorage.setItem("access token", token);
          dispatch(
            setUser({ ...user, userId: user._id })
          );
          toast.success(`Welcome back to Brain Booster!`);
          navigate("/user")
      } else {
        toast.error('An error occurred during login.');
      }
    } catch (error) {
      console.error('Error authenticating user:', error);
      toast.error('An error occurred during login.');
    }
  };

  // Handle login errors
  const onError = (error) => {
    console.error('Google login failed:', error);
    toast.error('Google login failed.');
  };

  // Call Google login hook
  const login = useGoogleLogin({
    onSuccess,
    onError,
  });

  return (
    <div className="text-white bg-[#7f9bc8] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2">
      <button onClick={() => login()}>
        Sign in with Google
      </button>
    </div>
  );
};

export default GoogleSignIn;