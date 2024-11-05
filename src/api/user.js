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

  const getAllOrdersByUserAPI = () => API.get(`/user/orders`);
  
  const getUserEnrolledCoursesAPI = () => API.get(`user/courses/enroll`);

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
}