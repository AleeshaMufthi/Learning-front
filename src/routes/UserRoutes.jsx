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
import Notification from '../pages/User/Notification.jsx'
import Tutors from '../pages/User/Tutors.jsx'
import NavBar from '../components/user/NavBar.jsx'
import { Chat } from '../pages/User/Chat.jsx'
import VideoMeet from '../pages/User/VideoMeet.jsx'
import ChangePassword from '../pages/User/ChangePassword.jsx'
import Quiz from '../pages/User/Quiz.jsx'
import Certificate from '../pages/User/Certificate.jsx'


export default function UserRoutes() {

  const dispatch = useDispatch();
  
  useEffect(() => {
    getSignedInUserAPI()
      .then((response) => {
        let userData = response.data?.userData || null;
        console.log(userData);
          if (!userData) {
            console.log("user not logged in");
            localStorage.removeItem("isAuth");
            dispatch(removeUser());
            return;
          }
          dispatch( 
            setUser({
              ...response.data?.userData,
              userId: response.data.userData._id,
            })
          );
      })
      .catch((err) => {
        console.error("Error fetching user data", err);
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
        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/changePassword" element={<ChangePassword />} />
        <Route path="user/profile" element={<Profile />} />
      

        <Route element={<PrivateUser />}>
        <Route path="explore" element={<Explore />} />
        <Route path="courses/:id" element={<Course />} />
        <Route path="user/profile/courses" element={<CourseOwned />} />
        <Route path="user/profile/transactions" element={<ViewTransaction />}/>
        <Route path="user/profile/wallet" element={<Wallet />}/>
        <Route path="user/profile/chat" element={<Chat />} />
        <Route path="user/profile/meet" element={<VideoMeet/>} />
        <Route path='user/profile/notification' element={<Notification />}/>
        <Route path="courses/enrolled" element={<Enrolled />} />
        <Route path="tutors" element={<Tutors />} />
        <Route path="courses/enrolled/:id" element={<ViewCourse />} />
        <Route path='quiz/:courseId' element={<Quiz />} />
        <Route path='certificates' element={<Certificate />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>

     
    </div>
  );
}
