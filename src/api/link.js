// users
const Dumy = "#"
const Home = "/"
const User = "/user"
const UserSignIn = (pathname) => `/signin?from=${pathname}`
const UserSignUp = "/signup"
const Profile = "/user/profile";
const ForgetPassword = "/forgetPassword"
const ResetPassword = "/resetPassword"

// tutors
const Tutor = "/tutor"
const TutorDashboard = "/tutor/dashboard"
const TutorProfile = "/tutor/profile";
const TutorSignIn = (pathname) => `/tutor/signin?from=${pathname}`;
const TutorSignUp = "/tutor/signup";
const TutorforgetPassword = "/tutor/forgetPassword"
const TutorresetPassword = "/tutor/resetPassword"

// admin
const Admin = "/admin";
const AdminSignIn = (pathname) => `/admin/signin?from=${pathname}`;
const AdminSignUp = "/admin/signup";
const AdminManageUser = "/user/manage";
const AdminManageTutor = "/tutor/manage";
const AdminProfile = "/admin/profile";


export {
    Dumy,
    Home,
    User,
    UserSignIn,
    UserSignUp,
    Profile,
    ForgetPassword,
    ResetPassword,
    Tutor,
    TutorDashboard,
    TutorSignIn,
    TutorSignUp,
    TutorProfile,
    TutorforgetPassword,
    TutorresetPassword,
    Admin,
    AdminSignIn,
    AdminSignUp,
    AdminManageUser,
    AdminManageTutor,
    AdminProfile,
}