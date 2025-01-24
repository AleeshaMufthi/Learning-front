import API from ".";
const adminSignInAPI = (body) => API.post("./auth/admin/signin", body);
const adminSignUpAPI = (body) => API.post("/auth/admin/signup", body);
const adminOtpSendAPI = (body) => API.post("./auth/admin/sendotp", body);
const getAdminTokenUpdate = () => API.get("/auth/admin/token");
const getSignedInAdminAPI = () => API.get("/auth/admin/restore");
const handleAdminLogOutAPI = () => API.delete("/auth/admin/logout");

// user list
const getAllUsersAPI = (data) => API.get(`/admin/users?${data}`)

  const blockUserAPI = (userId) => {
    return API.post("/admin/users/block", { userId });
  };
  const unBlockUserAPI = (userId) => {
    return API.post("/admin/users/unblock", { userId });
  };

  // tutors list
  const getAllTutorsAPI = (route = "/admin/tutors") => {
    return API.get(route);
  };

  const blockTutorAPI = (userId) => {
    return API.post("/admin/tutors/block", { userId });
  };
  const unBlockTutorAPI = (userId) => {
    return API.post("/admin/tutors/unblock", { userId });
  };

  
  // category
  const createCategoryAPI = (body, route = "/admin/category") => {
    return API.post(route, body);
  };

  const updateCategoryAPI = (id, body, route = `/admin/category/${id}`) => {
    return API.put(route, body)
  };

  const deleteCategoryAPI = (id, route = `/admin/category/${id}`) => {
    return API.delete(route);
  };

  const adminRevenueAPI = (route = '/admin/revenue') => {
    return API.get(route)
  }

  const adminDasboardAPI = (route = '/admin/dashboard') => {
    return API.get(route)
  }

  export {
    adminSignInAPI,
    adminSignUpAPI,
    adminOtpSendAPI,
    getSignedInAdminAPI,
    getAdminTokenUpdate,
    handleAdminLogOutAPI,
    getAllUsersAPI,
    blockUserAPI,
    unBlockUserAPI,
    getAllTutorsAPI,
    blockTutorAPI,
    unBlockTutorAPI,
    createCategoryAPI,
    updateCategoryAPI,
    deleteCategoryAPI,
    adminRevenueAPI,
    adminDasboardAPI,
  }