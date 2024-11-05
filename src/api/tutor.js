import API from ".";

// authentication
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

// courses
const createCourseAPI = (formData, route = `/tutor/courses/create`) => {
  return API.post(route, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};


const createLessonAPI = (formData, route = `/tutor/lessons`) => {
  return API.post(route, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const getAllCoursesByTutorAPI = (route = "/tutor/courses") => {
  return API.get(route);
};
const getCourseDetailsAPI = (id, route = `/tutor/courses/${id}`) => {
  return API.get(route);
};

const deleteCourseAPI = (id, route = `/tutor/courses/${id}`) => {
  return API.delete(route);
};

const updateCourseAPI = (id, course, route = `/tutor/courses/${id}`) => {
  console.log(route, "API route"); // Debug route URL
  return API.put(route, course);
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
    createCourseAPI,
    createLessonAPI,
    getAllCoursesByTutorAPI,
    getCourseDetailsAPI,
    deleteCourseAPI,
    updateCourseAPI,
}