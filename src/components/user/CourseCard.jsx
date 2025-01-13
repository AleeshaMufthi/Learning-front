import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Badge } from "flowbite-react";
import timeAgo from '../../utils/timeAgo'
import { getAllCoursesAPI } from "../../api/common";

export default function CourseCard() {

    const [courses, setCourses] = useState([]);

    useEffect(() => {
      (async () => {
        getAllCoursesAPI()
          .then((response) => {
            setCourses(response.data.data);
          })
          .catch((error) => {
            console.log(error);
          });
      })();
    }, []);
    return (
<>
      <div
        className="flex hide-scroll-bar pb-3"
        style={{ scrollSnapType: "x mandatory", overflow: "auto" }}
      >
        {courses.map((course) => (
          <div
            key={course._id}
            className="w-[300px] h-[300px] flex-shrink-0 scroll-snap-align-start bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ml-5 overflow-hidden"
          >
            <Link>
              <img
                className="w-full h-[150px] object-cover rounded-t-lg"
                src={course.thumbnailURL}
                alt="product image"
              />
            </Link>
            <div className="px-5 py-4 flex flex-col justify-start h-[250px]">
              <Link to={`/${course._id}`}>
                <h5 className="text-lg font-semibold tracking-tight text-center uppercase text-gray-900 dark:text-white">
                  {course.title}
                </h5>
                <h5 className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center">
                  {course.tagline}
                </h5>
              </Link>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-md font-bold text-green-600">
                  ₹{course.price}
                </span>
                <Link
                  to={`/explore`}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2.5 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Enroll
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
    );
  }
  