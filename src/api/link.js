// users
const Dumy = "#"
const Home = "/"
const User = "/user"
const UserSignIn = (pathname) => `/signin?from=${pathname}`
const UserSignUp = "/signup"
const Profile = "/user/profile";
const Explore = "/explore";
const ForgetPassword = "/forgetPassword"
const ResetPassword = "/resetPassword"
const CourseOwned = "/user/profile/courses";
const ViewTransaction = "/user/profile/transactions";
const Wallet = "/user/profile/wallet";
const Enrolled = "/courses/enrolled";
const UserCourse = (id) => `/courses/${id}`;
const UserViewCourse = (id) => `/courses/enrolled/${id}`;

// tutors
const Tutor = "/tutor"
const TutorDashboard = "/tutor/dashboard"
const TutorProfile = "/tutor/profile";
const TutorSignIn = (pathname) => `/tutor/signin?from=${pathname}`;
const TutorSignUp = "/tutor/signup";
const TutorforgetPassword = "/tutor/forgetPassword"
const TutorresetPassword = "/tutor/resetPassword"
const ManageCourse = "/tutor/courses";
const CreateCourse = "/tutor/courses/create";
const EditCourseForm = (id) =>`/tutor/courses/edit/${id}`
const TutorViewCourse = (id) => `/tutor/courses/${id}`;

// admin
const Admin = "/admin";
const AdminSignIn = (pathname) => `/admin/signin?from=${pathname}`;
const AdminSignUp = "/admin/signup";
const AdminManageUser = "/user/manage";
const AdminManageTutor = "/tutor/manage";
const AdminProfile = "/admin/profile";
const AdminCategory = "/admin/category";


export {
    Dumy,
    Home,
    User,
    UserSignIn,
    UserSignUp,
    UserCourse,
    UserViewCourse,
    Profile,
    Explore,
    ForgetPassword,
    ResetPassword,
    CourseOwned,
    ViewTransaction,
    Wallet,
    Enrolled,
    Tutor,
    TutorDashboard,
    TutorSignIn,
    TutorSignUp,
    TutorProfile,
    TutorforgetPassword,
    TutorresetPassword,
    ManageCourse,
    CreateCourse,
    EditCourseForm,
    TutorViewCourse,
    Admin,
    AdminSignIn,
    AdminSignUp,
    AdminManageUser,
    AdminManageTutor,
    AdminProfile,
    AdminCategory,
}