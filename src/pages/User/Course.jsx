import React, { useEffect, useState} from "react";
import { Toaster, toast } from "react-hot-toast";
import Loading from "../../components/common/Loading";
import SectionTitle from "../../components/common/SectionTitle";
import { BookOpenIcon, UserGroupIcon, CheckCircleIcon, ChevronUpIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { Tab, Disclosure } from "@headlessui/react";
import { getUser } from "../../components/authorization/getUser";
import { useLocation, useNavigate, useParams, Link } from "react-router-dom";
import { getCourseDetailsAPI, enrollCourseAPI, isEnrolledInCourseAPI } from "../../api/user";
import timeAgo from "../../utils/timeAgo";
import { Button } from "flowbite-react";
import HorizontalRule from '../../components/common/HorizontalRule';
import Payment from "../../components/user/Payment";
import Footer from "../../components/common/Footer";
import { getReviewAPI } from "../../api/user";

export default function Course() {
    const [course, setCourse] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [formattedDate, setFormattedDate] = useState({});
    const [reviews, setReviews] = useState({ reviews: [], hasReviewed: false });

    const user = getUser();
    const params = useParams();
    const navigate = useNavigate();
    const { pathname } = useLocation();
  
//     useEffect(() => {
//       (async () => {
//         const courseDetails = await getCourseDetailsAPI(params.id);
//         console.log(courseDetails, 'courseDetailssssssss');
        
//         console.log(user.userId)
//         const userCourse = await isEnrolledInCourseAPI(params.id, user.userId);
//         console.log(userCourse,"==============================")
//         setIsEnrolled(userCourse?.data?.enrolled);
//         setCourse(courseDetails.data.data);
//         setTimeout(() => setIsLoading(false));

//         // Fetch the reviews for this course
//       const reviewsData = await getReviewAPI(params.id);
//       console.log(reviewsData, 'reviews dataa');
//       console.log(reviewsData.data, 'reviews dataa.dataa');
//       setReviews(reviewsData.data);  // Store the reviews
//       setIsLoading(false);
//       })();
// }, []);

useEffect(() => {
  (async () => {
    try {
      setIsLoading(true);

      // Fetch course details
      const courseDetails = await getCourseDetailsAPI(params.id);
      setCourse(courseDetails.data.data);

      // Check if the user is enrolled in the course
      const userCourse = await isEnrolledInCourseAPI(params.id, user.userId);
      setIsEnrolled(userCourse?.data?.enrolled);

      // Fetch the reviews for this course
      const { data: reviewsData } = await getReviewAPI(params.id);
      console.log(reviewsData.reviews, 'reviewdata.reviewsssssss');
      
      setReviews({
        reviews: reviewsData?.reviews || [], // Ensure reviews is an array
        hasReviewed: reviewsData?.hasReviewed || false,
      });
    } catch (error) {
      console.error("Error fetching course details or reviews:", error);
    } finally {
      setIsLoading(false);
    }
  })();
}, [params.id, user.userId]);



    useEffect(() => {
      const courseDate = new Date(course.createdAt).toDateString();
      const courseTimeAgo = timeAgo(course.createdAt);
      setFormattedDate({
        timeAgo: courseTimeAgo,
        createdAt: courseDate,
      });
    }, [course.createdAt]);
    function classNames(...classes) {
      return classes.filter(Boolean).join(" ");
    }
    const handleEnrollCourse = async (courseId, type) => {
      if (!user.loggedIn)
        return navigate(`/signin?private=true&from=${pathname}`);
      if (type === "fake") console.log("fake Buy");
      try {
        const response = await enrollCourseAPI({ courseId: courseId });
      } catch (error) {
        return console.log("error in enrolling Course", error);
      }
      setIsEnrolled(true);
      toast.success(
        "Congratulations ! You have Enrolled For the Course Successfully.",
        {
          duration: "4000",
          position: "top-right",
        }
      );
    };
    console.log(isEnrolled,"enrolled")
    return (
 
      <>
      <Toaster />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8 p-8">
          {/* Left Column - Course Details & Instructor */}
          <div className="w-full lg:w-3/5 space-y-6">
          
            <SectionTitle title="Course Overview" description="Get an overview of the course here" />
            <HorizontalRule />
            
            {/* Course Details */}
            <div className="flex flex-col sm:flex-row sm:space-x-8 bg-white rounded-lg p-5 shadow-lg">
              <div className="flex flex-col sm:w-2/3 space-y-3">
                <h3 className="text-2xl font-semibold">{course.title}</h3>
                <p className="text-lg text-gray-500">{course.tagline}</p>
                
                {/* Course Image */}
                <img
                  src={course.thumbnail}
                  alt="Course Thumbnail"
                  className="w-full h-64 object-cover rounded-lg mt-4"
                />
                
                <div className="flex justify-between text-gray-600 mt-4">
                  <div className="flex items-center">
                    <BookOpenIcon className="w-5 text-blue-500 mr-2" />
                    <span>{course.lessons?.length} Lessons</span>
                  </div>
                  <div className="flex items-center">
                    <UserGroupIcon className="w-5 text-blue-500 mr-2" />
                    <span>{course.totalStudentsEnrolled ?? 3} Enrolled</span>
                  </div>
                </div>
              </div>
              
              {/* Instructor Info */}
              <div className="sm:w-1/3 flex flex-col items-center sm:items-start mt-3 sm:mt-0">
                <HorizontalRule className="my-2" />
                <div className="flex items-center">
                  <img
                    src={course.tutor.thumbnail || "https://i.pinimg.com/236x/76/f3/f3/76f3f3007969fd3b6db21c744e1ef289.jpg"}
                    alt="Instructor Thumbnail"
                    className="w-16 h-16 object-cover rounded-full"
                  />
                  <div className="ml-4">
                  <span className="text-sm font-normal">Course created by,</span>
                    <h4 className="text-lg font-medium">Prof. {course.tutor?.name}</h4>
                  </div>
                </div>
              </div>
            </div>
          <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
              <p className="text-lg font-semibold">Lessons Overview</p>

              {course.lessons && course.lessons.length > 0 ? (
            <ul className="mt-4 space-y-4">
              {course.lessons.map((lesson, index) => (
            <li key={lesson._id} className="flex items-start space-x-4 border-b pb-4">
                 <div className="text-md font-semibold text-gray-800">
            {index + 1}.
          </div>
            <div className="text-2xl text-blue-500">
            
              <i className="fas fa-video"></i>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800">
              {lesson.title}
              </h3>
            <p className="text-gray-700 text-justify">{lesson.description}
            <span className="text-sm text-gray-500 ml-5">
                (Published On: {new Date(lesson.createdAt).toLocaleDateString()})
              </span>
            </p>
            </div>
            <div className="text-red-500">
            <i className="fas fa-lock"></i>
          </div>
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-gray-500 mt-4">No lessons available for this course.</p>
  )}
</div>
</div>
    
          {/* Right Column - Price & Payment */}
          <div className="bg-white rounded-lg p-2 shadow-lg">
            <SectionTitle title="Price" description="This is a Paid Course" />
            <HorizontalRule />
            
            <div className="text-center space-y-4">
              {isEnrolled ? (
                <div className="flex flex-col items-center">
                  <CheckCircleIcon className="text-green-400 w-20" />
                    <Link
                        to={`/courses/enrolled/${course._id}`}
                        className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-md px-11 py-2 text-center mb-3 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                     Start Learning
                    </Link>
                  <p>Woohoo! You're in! Get ready to learn and have fun! 📚</p>
                  <Button
                    className="mt-5"
                    onClick={() => navigate(`/courses/enrolled/${course._id}`)}
                  >
                    View Course
                  </Button>
                </div>
              ) : (
                <>
                  <p className="text-lg font-semibold text-gray-600">
                    Pay once & own it forever
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    ₹{course?.price} INR
                  </p>
                  <Payment
                    courseId={course._id}
                    setIsEnrolled={setIsEnrolled}
                  >
                    Get Course
                  </Payment>
                  <p className="text-xs text-gray-500 mt-4">
                    Invoices and receipts available for easy company reimbursement.
                  </p>
                </>
              )}
            </div>

           {/* Reviews Section */}
  <p className="text-lg font-semibold mb-4">Reviews</p>
  {reviews?.reviews?.length > 0 ? (
    reviews.reviews.slice(0, 3).map((review, index) => ( // Limit to 3 reviews
      <div
        key={index}
        className="flex flex-col bg-gray-50 p-4 mb-4 rounded-lg shadow-md"
      >
        {/* Thumbnail and Username */}
        <div className="flex items-center">
          <img
            src={review.userId.thumbnail}
            alt="User Thumbnail"
            className="w-16 h-16 rounded-full object-cover border-2 border-gray-300 mr-4"
          />
          <p className="text-lg font-semibold">{review.userId.name}</p>
        </div>
        <p className="text-gray-700 ml-20">{review.reviewText}</p>
          <p className="text-yellow-500 font-bold ml-20">{review.rating}⭐ rating</p>
      
      </div>
    ))
  ) : (
    <p className="text-gray-500 mt-4">No reviews yet for this course.</p>
  )}

          </div>

                      
    


        </div>
      )}
      
      
      <Footer />
    </>
    
    );
  }
  