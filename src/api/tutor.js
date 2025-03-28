import API from ".";

// authentication
const tutorSignInAPI = (body) => API.post("/auth/tutor/signin", body);
const tutorSignUpAPI = (body) => API.post("/auth/tutor/signup", body);
const tutorOtpSendAPI = (body) => API.post("/auth/tutor/sendotp", body);
const tutorForgetPasswordAPI = (body) => API.post("/auth/tutor/forgetPassword",body);
const tutorResetPasswordAPI = (body) => API.post("/auth/tutor/resetPassword",body);
const getTutorTokenUpdate = () => API.get("/auth/tutor/token");
const getSignedInTutorAPI = () => API.get("/auth/tutor/restore");
const handleTutorLogOutAPI = () => API.delete("/auth/tutor/logout");

// tutor profile
const getTutorDetailsAPI = () => API.get("/tutor/details");
const updateTutorDetailsAPI = (formData) => API.post("/tutor/details",  formData, { headers: { "Content-Type": "multipart/form-data" }});
const getTopTutorsAPI = async (route = "/tutor/details/top") => {
  return API.get(route);
};
const getAllTutorsAPI = (data) => API.get(`/tutor/details/all?${data}`)


// courses
const createCourseAPI = (formData, route = `/tutor/courses/create`) => {
  return API.post(route, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
const createLessonAPI = (formData, onUploadProgress) => {
  return API.post('/tutor/lessons', formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress,
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
  return API.put(route, course);
};


// Quiz
const createQuizAPI = (quizData) => API.post(`/tutor/quiz/create`, quizData);
const getQuizByCourseIdAPI = (courseId) => API.get(`/tutor/quiz/${courseId}`);
const getQuizDetailsAPI = (quizId) => API.get(`/tutor/quiz/${quizId}`);
const updateQuizAPI = (quizId, updatedData) => API.put(`/tutor/quiz/${quizId}`, updatedData);

// chat

const fetchEnrolledUsersAPI = () => API.get(`/tutor/chat/enrolled-users`)

const tutorMessageAPI = () => API.get(`/tutor/chat/message`)

const fetchTutorMessagesAPI = (userId) => API.get(`/tutor/chat/message/${userId}`)
// const fetchTutorMessagesAPI = async (userId) => API.get(`/tutor/chat/message/${userId}`);

const tutorRevenueAPI = (route = '/tutor/revenue') => {
  return API.get(route)
}

export{
    tutorSignInAPI,
    tutorSignUpAPI,
    tutorOtpSendAPI,
    getSignedInTutorAPI,
    getTutorTokenUpdate,
    tutorForgetPasswordAPI,
    tutorResetPasswordAPI,
    handleTutorLogOutAPI,
    getTutorDetailsAPI,
    getAllTutorsAPI,
    updateTutorDetailsAPI,
    getTopTutorsAPI,
    createCourseAPI,
    createLessonAPI,
    getAllCoursesByTutorAPI,
    getCourseDetailsAPI,
    deleteCourseAPI,
    updateCourseAPI,
    fetchEnrolledUsersAPI,
    tutorMessageAPI,
    fetchTutorMessagesAPI,
    tutorRevenueAPI,
    createQuizAPI,
    getQuizByCourseIdAPI,
    getQuizDetailsAPI,
    updateQuizAPI,
}