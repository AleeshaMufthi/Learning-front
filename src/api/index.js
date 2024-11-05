import axios from "axios";
import toast from "react-hot-toast";

const API = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true,
})

API.interceptors.request.use((req)=>{
    return req
})


API.interceptors.response.use(
    (response) => {
      return response;
    },
    
    (error) => {
      console.log(error);
      toast.dismiss();
      if (error?.code === "ERR_NETWORK" || error?.code === "ERR_BAD_RESPONSE") {
        toast.error("Oops! it seems that the server is not connected");
      }

      if (error?.response?.data?.err?.name === "TokenMissingError") {
        console.log("Token Missing");
        removeLocalAuth();
        window.location.href = "/signin";
      }
      if (error?.response?.data?.err?.name === "TokenExpiredError") {
        console.log("token expired");
        removeLocalAuth();
        window.location.href = "/signin?expired=true";
      }
      
      return Promise.reject(error);
    }
)

export default API
