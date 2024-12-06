import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import { useState, useEffect } from "react";


const PrivateAdmin = () => {
    const admin = localStorage.getItem("isAdminAuth");
    return admin ? <Outlet /> : <Navigate to={"/admin/signin?private=true"} />;
};

const PrivateUser = () => {
    const [isAllowed, setIsAllowed] = useState(null);
    useEffect(() => {
        const user = localStorage.getItem("isAuth");
        if (user) {
          setIsAllowed(true);
        } else {
          setIsAllowed(false);
        }
      }, []);
      if (isAllowed === null) {
        return <div>Loading...</div>;
      } 
    return isAllowed ? <Outlet /> : <Navigate to={"/signin?private=true"} />
}

const PrivateTutor = () => {
    const [isAllowed, setIsAllowed] = useState(null);
    useEffect(() => {
        const tutor = localStorage.getItem("isTutorAuth");
        if (tutor) {
          setIsAllowed(true);
        } else {
          setIsAllowed(false);
        }
      }, []); 

      if (isAllowed === null) {
        return <div>Loading...</div>;
      }
    return isAllowed ? <Outlet /> : <Navigate to={"/tutor/signin?private=true"} />;
  };
  

export {
    PrivateUser,
    PrivateTutor,
    PrivateAdmin,
}