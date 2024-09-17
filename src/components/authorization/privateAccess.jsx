import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"

const PrivateAdmin = () => {
    const admin = localStorage.getItem("isAdminAuth");
    return admin ? <Outlet /> : <Navigate to={"/admin/signin?private=true"} />;
};

const PrivateUser = () => {
    const user = localStorage.getItem("isAuth")
    return user ? <Outlet /> : <Navigate to={"/signin?private=true"} />
}

const PrivateTutor = () => {
    const tutor = localStorage.getItem("isTutorAuth");
    return tutor ? <Outlet /> : <Navigate to={"/tutor/signin?private=true"} />;
  };
  

export {
    PrivateUser,
    PrivateTutor,
    PrivateAdmin,
}