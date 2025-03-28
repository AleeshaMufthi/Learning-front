import API from ".";

// authentication
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

const updateUserDetailsAPI = (formData) => API.post("/user/details", formData, { headers: { "Content-Type": "multipart/form-data" }});

const changePasswordAPI = (data) => API.post("/user/details/changePassword", data);

// courses
const getCourseDetailsAPI = (id, route = "/user/courses/enroll/") =>
    API.get(route + id);

const getCourseEnrolledDetailsAPI = (id, route = "/user/courses/enrolled/") =>
    API.get(route + id);

const enrollCourseAPI = (body) => API.post("/user/courses/enroll", body);

const createOrderAPI = (courseId) =>  
    API.post("/user/orders/create", { courseId });

  const verifyPaymentAPI = (data) =>
    API.post("/user/orders/payment/verify", data);

  const cancelOrderAPI = (orderId) => 
    API.post("/user/orders/cancel-order", { orderId});

  // wallet

 const getWalletBalanceAPI = () => API.get("/user/wallet/balance");

 const creditWalletAPI = (amount) => API.post("/user/wallet/credit", { amount });
 

  const isEnrolledInCourseAPI = (courseId) =>
    API.get(`/user/details/enrolled/${courseId}/check`);

  const getAllOrdersByUserAPI = (data) => API.get(`/user/orders?${data}`);
  
  const getUserEnrolledCoursesAPI = (data) => API.get(`user/courses/enroll?${data}`);

  // chat

  const fetchEnrolledCoursesAPI = () => API.get(`/user/chat/enrolled-courses`)

  // const messageFromUserAPI = (data) => API.post(`/user/chat/message`, data)
  const messageFromUserAPI = async (data) => {
    console.log("Sending data to backend:", data);
    return await API.post(`/user/chat/message`, data);
  };

  const fetchAllMessagesAPI = (tutorId) => API.get(`/user/chat/message/${tutorId}`)

  // const UserViewLesson = (lessonId) => API.get(`/user/lessons/video?id=${lessonId}`);

  const getAllNotificationsAPI = () => API.get('/user/notification');

  const markAsReadAPI = (notificationId) => API.put(`/user/notification/${notificationId}`)

  const calculateRevenueAPI = (orderId) => {
    if (!orderId) {
        console.error("Order ID is invalid or missing.");
        return;
    }
    return API.post(`/user/revenue/process-payment/${orderId}`);
};

// quiz

const getQuizDetailsAPI = (courseId) => API.get(`/user/quiz/${courseId}`)

// review

const addReviewAPI = (courseId, data) => API.post(`/user/review/create/${courseId}`, data)
const getReviewAPI = (courseId) => API.get(`/user/review/${courseId}`)

// certificate

const createCertificateAPI = (data) => API.post(`/user/certificate/create`, data)
const getCertifiedDetailsAPI = (userId) => API.get(`/user/certificate/${userId}`)

export {
    userSignInAPI,
    userSignUpAPI,
    userOtpSendAPI,
    forgetPasswordAPI,
    // UserViewLesson,  
    // verifyOtpAPI,
    getSignedInUserAPI,
    resetPasswordAPI,
    getTokenUpdate,
    handleLogOutAPI,
    getUserDetailsAPI,
    changePasswordAPI,
    updateUserDetailsAPI,
    googleAuthAPI,
    getCourseDetailsAPI,
    enrollCourseAPI,
    getCourseEnrolledDetailsAPI,
    createOrderAPI,
    verifyPaymentAPI,
    cancelOrderAPI,
    isEnrolledInCourseAPI,
    getAllOrdersByUserAPI,
    getUserEnrolledCoursesAPI,
    getWalletBalanceAPI,
    creditWalletAPI,
    fetchEnrolledCoursesAPI,
    messageFromUserAPI,
    fetchAllMessagesAPI,
    getAllNotificationsAPI,
    markAsReadAPI,
    calculateRevenueAPI,
    getQuizDetailsAPI,
    addReviewAPI,
    getReviewAPI,
    createCertificateAPI,
    getCertifiedDetailsAPI,
}