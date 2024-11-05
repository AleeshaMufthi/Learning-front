import React from 'react'
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
import Explore from '../pages/User/Explore.jsx'
import Course from '../pages/User/Course.jsx'
import CourseOwned from '../pages/User/CourseOwned.jsx'
import ViewTransaction from '../pages/User/ViewTransaction.jsx'
import ViewCourse from '../pages/User/ViewCourse.jsx'
import Enrolled from '../pages/User/Enrolled.jsx'
import Wallet from '../pages/User/ViewWallet.jsx'
import NavBar from '../components/user/NavBar.jsx'


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
      <NavBar />
      <Toaster />
      <Routes>
        <Route path="user" element={<Home />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route element={<PrivateUser />} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="user/profile" element={<Profile />} />
        <Route path="explore" element={<Explore />} />
        <Route path="courses/:id" element={<Course />} />
        <Route path="user/profile/courses" element={<CourseOwned />} />
        <Route path="user/profile/transactions" element={<ViewTransaction />}/>
        <Route path="user/profile/wallet" element={<Wallet />}/>
        <Route path="courses/enrolled" element={<Enrolled />} />
        <Route path="courses/enrolled/:id" element={<ViewCourse />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
     
    </div>
  );
}
