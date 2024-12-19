import { Route, Routes } from "react-router-dom";
import SignIn from "../pages/Admin/SignIn";
import SignUp from "../pages/Admin/SignUp";
import Home from "../pages/Admin/Home";
import NotFound from "../pages/NotFound";
import ManageUsers from "../pages/Admin/ManageUsers";
import ManageTutors from "../pages/Admin/ManageTutors";
import ManageCategory from "../pages/Admin/ManageCategory";
import { setAdmin, removeAdmin } from "../feautures/adminSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getSignedInAdminAPI } from "../api/admin";
import { PrivateAdmin } from "../components/authorization/privateAccess";
import ManageAdmin from "../pages/Admin/ManageAdmin";
import Revenue from '../pages/Admin/Revenue'
import { Toaster } from "react-hot-toast";

export default function adminRoutes() {
    const dispatch = useDispatch();
    useEffect(() => {
      getSignedInAdminAPI()
        .then((response) => {
          console.log(response);
          let adminData = response.data?.adminData || null;
          console.log(adminData);
          if (!adminData) {
            console.log("user not logged in");
            localStorage.removeItem("isAdminAuth");
            dispatch(removeAdmin());
            return;
          }
          dispatch(
            setAdmin({
              ...response.data?.adminData,
              userId: response.data.adminData._id,
            })
          );
        })
        .catch((err) => {
          console.log("error", err);
        });
    }, []);
    return (
      <div>
        <div>
          <Toaster position="bottom-center" reverseOrder={true} />
        </div>
        <Routes>
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route element={<PrivateAdmin />}>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<ManageUsers />} />
            <Route path="/tutors" element={<ManageTutors />} />
            <Route path="/category" element={<ManageCategory />} />
            <Route path="/admins" element={<ManageAdmin />} />
            <Route path="/revenue" element={<Revenue />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
       
      </div>
    );
  }
  