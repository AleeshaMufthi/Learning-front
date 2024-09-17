import API from ".";

const userSignInAPI = (body) => API.post("/auth/signin", body);
const userSignUpAPI = (body) => API.post("/auth/signup", body);
const userOtpSendAPI = (body) => API.post("/auth/sendotp", body);
const forgetPasswordAPI = (body) => API.post("/auth/forgetPassword",body);
// const verifyOtpAPI = (body) => API.post("/auth/verifyOtp", body);
const resetPasswordAPI = (body) => API.post("auth/resetPassword",body)
const getSignedInUserAPI = () => API.get("/auth/user/restore");
const getTokenUpdate = () => API.get("/auth/token");
const handleLogOutAPI = () => API.delete("/auth/logout");
const googleAuthAPI = (body) => API.post("/auth/google", body);

// user profile
const getUserDetailsAPI = () => API.get("/user/details");
const updateUserDetailsAPI = (body) => API.post("/user/details", body);

export {
    userSignInAPI,
    userSignUpAPI,
    userOtpSendAPI,
    forgetPasswordAPI,
    // verifyOtpAPI,
    getSignedInUserAPI,
    resetPasswordAPI,
    getTokenUpdate,
    handleLogOutAPI,
    getUserDetailsAPI,
    updateUserDetailsAPI,
    googleAuthAPI,
}