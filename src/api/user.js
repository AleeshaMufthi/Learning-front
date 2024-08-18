import API from ".";

const userSignInAPI = (body) => API.post("/auth/signin", body);
const userSignUpAPI = (body) => API.post("/auth/signup", body);
const userOtpSendAPI = (body) => API.post("/auth/sendotp", body);
const resendOtp = (body) => API.post("auth/resendotp", body)
const getSignedInUserAPI = () => API.get("/auth/user/restore");
const getTokenUpdate = () => API.get("/auth/token");

export {
    userSignInAPI,
    userSignUpAPI,
    userOtpSendAPI,
    resendOtp,
    getSignedInUserAPI,
    getTokenUpdate
}