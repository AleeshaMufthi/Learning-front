import API from './index'

const getAllCategoriesAdminAPI = (data) => {
  return API.get(`/admin/category?${data}`);
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
const getAllCategoriesAPI = () => {
  return API.get('/admin/category/all')
}

export {
  getAllCategoriesAdminAPI,
  getAllCoursesAPI,
  getAllCourseByFilter,
  getLessonDetailsAPI,
  getAllCategoriesAPI,
};