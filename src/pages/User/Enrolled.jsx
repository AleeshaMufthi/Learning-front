import { useState, useEffect } from "react";
import SectionTitle from "../../components/common/SectionTitle";
import HorizontalRule from "../../components/common/HorizontalRule";
import Loading from "../../components/common/Loading";
import { Link } from "react-router-dom";
import { Badge } from "flowbite-react";
import { getUserEnrolledCoursesAPI } from "../../api/user";
import { Dumy, UserViewCourse } from "../../api/link";
import Footer from "../../components/common/Footer";

export default function Enrolled() {

    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      getUserEnrolledCoursesAPI()
        .then((response) => {
          console.log(response.data.data,"=========================")
          setCourses(response.data.data);
          setTimeout(() => setIsLoading(false), 1000);
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);
console.log(courses,"iriririririr")
    return (
      <>
        <SectionTitle
          title="Enrolled Courses"
          description="Courses  enrolled by you. Happy Learning!"
        />
        <HorizontalRule />
        <div className="grid grid-cols-4 justify-center mr-10 gap-1">
          {isLoading ? (
            <Loading />
          ) : courses.length ? (
            courses.map((course) => (
              <div
                className="max-w-sm block hover:shadow-lg duration-300 bg-white border overflow-hidden border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ml-10"
                key={course._id}
              >
                <div className="overflow-hidden">
                  <Link to={UserViewCourse(course._id)}>
                    <img
                      src={course.thumbnail}
                      alt="Product Image"
                      className="rounded-t-lg duration-300 scale-105 min-h-[11rem] object-cover hover:scale-100"
                    />
                  </Link>
                </div>
                <div className="px-5 pb-5">
                  <Link to={Dumy}>
                    <h5 className="text-xl font-semibold tracking-tight text-white text-center uppercase pt-4 nexa-font pb-3">
                      {course.title}
                    </h5>
                    <span className="text-sm font-semibold tracking-tight text-gray-600 nexa-font pb-3">
                      {course.tagline}
                    </span>
                  </Link>
                
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col items-start justify-start">
                      <span className="text-sm font-bold text-red-500 line-through ">
                        ₹{course.price + 490}
                      </span>
                      <span className="text-2xl font-bold text-green-900 ">
                        ₹{course.price}
                      </span>
                    </div>
                    <Link
                      to={`/courses/enrolled/${course._id}`}
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Start Learning
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center h-100 ml-20">
              <h1 className="nexa-font">You haven`t enrolled in any courses</h1>
            </div>
          )}
        </div>
      </>
    );
  }
  