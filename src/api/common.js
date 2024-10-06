import API from './index'

const getAllCategoriesAPI = (route = "/admin/category") => {
  return API.get(route);
};
const getAllCoursesAPI = () => {
  return API.get("/user/courses");
};
const getAllCourseByFilter = (data) => {
  return API.get(`user/courses?${data}`);
};
const getLessonDetailsAPI = (lessonId) => {
  return API.get(`/user/lessons/${lessonId}`);
};

export {
  getAllCategoriesAPI,
  getAllCoursesAPI,
  getAllCourseByFilter,
  getLessonDetailsAPI,
};