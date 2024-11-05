import NavBar from '../components/tutor/NavBar.jsx'
import { Route, Routes } from "react-router-dom";
import SignIn from "../pages/Tutor/SignIn";
import SignUp from "../pages/Tutor/SignUp";
import { Toaster } from "react-hot-toast";
import Home from "../pages/Tutor/Home";
import NotFound from "../pages/NotFound";
import { PrivateTutor } from "../components/authorization/privateAccess";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getSignedInTutorAPI } from "../api/tutor";
import { setTutor, removeTutor } from "../feautures/tutorSlice";
import Dashboard from "../pages/Tutor/Dashboard.jsx";
import Profile from "../pages/Tutor/Profile.jsx";
import ForgetPassword from "../pages/Tutor/ForgetPassword.jsx";
import ResetPassword from "../pages/Tutor/ResetPassword.jsx";
import CreateCourse from "../pages/Tutor/CreateCourse.jsx";
import CourseLesson from "../pages/Tutor/CourseLesson.jsx";
import ManageCourses from "../pages/Tutor/ManageCourses.jsx";
import EditCourseForm from '../pages/Tutor/EditCourseForm.jsx';
import ViewLesson from '../pages/Tutor/ViewLesson.jsx';

export default function TutorRoutes() {

    const dispatch = useDispatch();

    useEffect(() => {
      getSignedInTutorAPI()
        .then((response) => {
          let tutorData = response.data?.tutorData || null;
          console.log(tutorData);
          if (!tutorData) {
            console.log("user not logged in");
            localStorage.removeItem("isTutorAuth");
            dispatch(removeTutor());
            return;
          }
          dispatch(
            setTutor({
              ...response.data?.tutorData,
              userId: response.data.tutorData._id,
            })
          );
        })
        .catch((err) => {
          console.log("error", err);
        });
    }, []);
    return (
      <div>
        <NavBar />
        <Toaster />
        <Routes>
          <Route element={<PrivateTutor />}>
          <Route path="profile" element={<Profile />} />
          <Route path="dashboard" element={<Dashboard />} />
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="forgetPassword" element={<ForgetPassword />} />
          <Route path="resetPassword" element={<ResetPassword />} />
          <Route path="courses/create" element={<CreateCourse />} />
          <Route path="courses" element={<ManageCourses />} />
          <Route path="courses/:id" element={<CourseLesson />} />
          <Route path="courses/edit/:id" element={<EditCourseForm />}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
      
      </div>
    );
  }