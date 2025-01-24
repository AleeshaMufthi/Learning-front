import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { setUser } from "../feautures/userSlice";
import { setTutor } from "../feautures/tutorSlice";
import { setAdmin } from "../feautures/adminSlice";
import { refreshToken } from "./authService";

export const rehydrateSession = async () => {
    const dispatch = useDispatch();
  
    try {
      const role = localStorage.getItem("role");
      if (!role) return; 
  
      const newAccessToken = await refreshToken(); 
      const userData = jwtDecode(newAccessToken); 
  
      if (role === "tutor") {
        dispatch(
          setTutor({
            name: userData.name,
            email: userData.email,
            tutorId: userData.tutorId,
          })
        );
      } else if (role === "admin") {
        dispatch(
          setAdmin({
            name: userData.name,
            email: userData.email,
            adminId: userData.adminId,
          })
        );
      } else {
        dispatch(
          setUser({
            name: userData.name,
            email: userData.email,
            userId: userData.userId,
            username: userData.username,
          })
        );
      }
    } catch (error) {
      console.error("Rehydration failed:", error);
      localStorage.clear();
      window.location.href = "/signin";
    }
};