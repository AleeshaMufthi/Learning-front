import API from ".";

const adminSignInAPI = (body) => API.post("./auth/admin/signin", body);
const adminSignUpAPI = (body) => API.post("/auth/admin/signup", body);
const adminOtpSendAPI = (body) => API.post("./auth/admin/sendotp", body);
const getSignedInAdminAPI = () => API.get("/auth/admin/restore");
const handleAdminLogOutAPI = () => API.delete("/auth/admin/logout");

// full user api
const getAllUsersAPI = (route = "/admin/users") => {
    return API.get(route);
  };
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

  export {
    adminSignInAPI,
    adminSignUpAPI,
    adminOtpSendAPI,
    getSignedInAdminAPI,
    handleAdminLogOutAPI,
    getAllUsersAPI,
    blockUserAPI,
    unBlockUserAPI,
    getAllTutorsAPI,
    blockTutorAPI,
    unBlockTutorAPI,
  }