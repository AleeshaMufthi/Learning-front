import axios from "axios";
import toast from "react-hot-toast";
import { getTutorTokenUpdate } from "./tutor";

const API = axios.create({
    baseURL: 'https://brain-booster.site',
    withCredentials: true,
})

API.interceptors.request.use((req)=>{
  return req
})

API.interceptors.response.use(
  (response) => response,
  
  async (error) => {
    console.log('API error',error);
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
      console.log("Token expired, Attempting to refresh...");

      try {
        // Call the refresh endpoint to get a new access token
        await getTutorTokenUpdate();

        // Retry the original request with the refreshed token
        return API(error.config);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);

        // Clear cookies on refresh failure (handled server-side)
        window.location.href = "/signin?expired=true";
      }
    }
    
    return Promise.reject(error);
  }
)

export default API
