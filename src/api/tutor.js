import API from ".";

const tutorSignInAPI = (body) => API.post("/auth/tutor/signin", body);
const tutorSignUpAPI = (body) => API.post("/auth/tutor/signup", body);
const tutorOtpSendAPI = (body) => API.post("/auth/tutor/sendotp", body);
const tutorForgetPasswordAPI = (body) => API.post("/auth/tutor/forgetPassword",body);
const tutorResetPasswordAPI = (body) => API.post("/auth/tutor/resetPassword",body)
const getSignedInTutorAPI = () => API.get("/auth/tutor/restore");
const handleTutorLogOutAPI = () => API.delete("/auth/tutor/logout");

// tutor profile
const getTutorDetailsAPI = () => API.get("/tutor/details");
const updateTutorDetailsAPI = (body) => API.post("/tutor/details", body);
const getTopTutorsAPI = async (route = "/tutor/details/top") => {
  return API.get(route);
};

export{
    tutorSignInAPI,
    tutorSignUpAPI,
    tutorOtpSendAPI,
    getSignedInTutorAPI,
    tutorForgetPasswordAPI,
    tutorResetPasswordAPI,
    handleTutorLogOutAPI,
    getTutorDetailsAPI,
    updateTutorDetailsAPI,
    getTopTutorsAPI,
}