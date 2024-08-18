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
      
      return Promise.reject(error);
    }
)

export default API
