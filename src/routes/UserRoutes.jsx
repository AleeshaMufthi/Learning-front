import React from 'react'
import NavBar from '../components/user/NavBar'
import { Route, Routes, useNavigate } from 'react-router-dom'
import SignIn from '../pages/User/SignIn.jsx'
import SignUp  from '../pages/User/SignUp.jsx'
import ForgetPassword from '../pages/User/ForgetPassword.jsx'
import ResetPassword from '../pages/User/ResetPassword.jsx'
import { Toaster } from 'react-hot-toast'
import Home from '../pages/User/Home'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getSignedInUserAPI } from '../api/user'
import { setUser, removeUser } from '../feautures/userSlice'
import { PrivateUser } from '../components/authorization/privateAccess.jsx'
import NotFound from '../pages/NotFound.jsx'
import Profile from '../pages/User/Profile.jsx'


export default function UserRoutes() {

  const dispatch = useDispatch();
  const navigate = useNavigate()
  
  useEffect(() => {
    getSignedInUserAPI()
      .then((response) => {
        let userData = response.data?.userData || null;
        if (userData) {
          dispatch(
            setUser({
              ...userData,
              userId: userData._id,
            })
          );
        }else{
           localStorage.removeItem("isAuth");
           dispatch(removeUser());
        }
      })
      .catch((err) => {
        console.error("Error fetching user data", err);
        // Handle error case, optionally remove auth state and redirect
        localStorage.removeItem("isAuth");
        dispatch(removeUser());
        navigate('/signin');
      });
  }, []);
  return (
    <div>
      <Toaster />
      <Routes>
        <Route path="user" element={<Home />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route element={<PrivateUser />} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="user/profile" element={<Profile />} />
        {/* <Route path="/sendotp" element={<Otp />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
