import NavBar from "../components/tutor/NavBar";
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
import Dashboard from "../pages/Tutor/Dashboard";
import Profile from "../pages/Tutor/Profile";
import ForgetPassword from "../pages/Tutor/ForgetPassword";
import ResetPassword from "../pages/Tutor/ResetPassword";

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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    );
  }