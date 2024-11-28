import { Badge } from "flowbite-react";
import { Link } from "react-router-dom";
import timeAgo from '../../utils/timeAgo'
import { TutorViewCourse } from "../../api/link";
import Loading from "../common/Loading";

export default function CourseCard({ courses, loading }) {
    return (
      <>
        <div className="justify-center flex flex-wrap gap-2 hide-scroll-bar pb-3">
          {courses.length ? (
            !loading ? (
              courses.map((course) => (
                <Link to={TutorViewCourse(course._id)} key={course._id}>
                  <div className="w-82 max-w-xs block hover:shadow-lg duration-300 bg-white border overflow-hidden border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ml-10">
                    <div className="h-40 overflow-hidden">
                      <img
                        src={course?.thumbnailURL}
                        alt="image here"
                        className="rounded-t-lg duration-300 scale-105 hover:scale-100"
                      />
                    </div>
                    <div className="px-5 pb-5">
                      <h5 className="text-xl font-semibold text-center uppercase pb-3 tracking-tight text-gray-900 dark:text-white pt-4 nexa-font">
                        {course.title}
                      </h5>
                      <h5 className="text-sm pb-3 font-semibold tracking-tight text-gray-400 dark:text-white nexa-font">
                        {course.tagline}
                      </h5>
                    
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col items-start justify-start">
                          <span className="text-sm font-bold text-red-500 line-through ">
                            ₹{course.price + 490}
                          </span>
                          <span className="text-2xl font-bold text-gray-900 dark:text-white">
                            ₹{course.price}
                          </span>
                        </div>
                        <span className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                          View Course
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <Loading />
            )
          ) : (
            <div className="flex flex-col gap-3 pt-5">
              <div>You haven't created any courses yet!</div>
              <Link
                to={"/tutor/courses/create"}
                className="rounded bg-gray-700 p-2 max-w-34 hover:bg-gray-500 hover:text-gray-700 text-center pt-3 pb-3"
              >
                Create Course
              </Link>
            </div>
          )}
        </div>
      </>
    );
  }