// users
const Dumy = "#"
const Home = "/"
const User = "/user"
const UserSignIn = (pathname) => `/signin?from=${pathname}`
const UserSignUp = "/signup"
const Profile = "/user/profile";
const Explore = "/explore";
const Contact = "/contact"
const About = "/about"
const ForgetPassword = "/forgetPassword"
const ResetPassword = "/resetPassword"
const ChangePassword = "/changePassword"
const CourseOwned = "/user/profile/courses";
const ViewTransaction = "/user/profile/transactions";
const Wallet = "/user/profile/wallet";
const Chat = "/user/profile/chat"
const Meet = "/user/profile/meet"
const Notification = "/user/profile/notification"
const Enrolled = "/courses/enrolled";
const Tutors = "/tutors"
const Quiz = "/quiz"
const UserCourse = (id) => `/courses/${id}`;
const UserViewCourse = (id) => `/courses/enrolled/${id}`;


// tutors
const Tutor = "/tutor"
const TutorDashboard = "/tutor/dashboard"
const TutorProfile = "/tutor/profile";
const TutorChat = "/tutor/profile/chat"
const TutorMeet = '/tutor/profile/meet'
const TutorSignIn = (pathname) => `/tutor/signin?from=${pathname}`;
const TutorSignUp = "/tutor/signup";
const TutorforgetPassword = "/tutor/forgetPassword"
const TutorresetPassword = "/tutor/resetPassword"
const Revenue = "/tutor/profile/revenue"
const ManageCourse = "/tutor/courses";
const CreateCourse = "/tutor/courses/create";
const AddQuiz = "/addQuiz";
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
const AdminRevenue = "/admin/revenue";


export {
    Dumy,
    Home,
    User,
    UserSignIn,
    UserSignUp,
    UserCourse,
    UserViewCourse,
    // UserViewLesson,
    Profile,
    Explore,
    Contact,
    About,
    Tutors,
    Quiz,
    Meet,
    TutorMeet,
    ForgetPassword,
    ResetPassword,
    ChangePassword,
    CourseOwned,
    ViewTransaction,
    Wallet,
    Chat,
    Notification,
    Revenue,
    Enrolled,
    Tutor,
    TutorDashboard,
    TutorSignIn,
    TutorSignUp,
    TutorProfile,
    TutorChat,
    TutorforgetPassword,
    TutorresetPassword,
    AddQuiz,
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
    AdminRevenue,
}