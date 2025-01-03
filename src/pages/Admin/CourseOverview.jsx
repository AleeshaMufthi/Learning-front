import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllCoursesAPI } from "../../api/common";
import Layout from "../../components/admin/Layout";
import PageInfo from "../../components/common/PageInfo";

export default function CourseOverview() {

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
      
          <Layout>
          <PageInfo admin pageName={"Courses Overview"}/>
          <div className="p-5">
      <ul className="space-y-4">
        {courses.map((course) => (
          <li
            key={course._id}
            className="flex items-center p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={course.thumbnailURL}
              alt={course.title}
              className="w-16 h-16 rounded-full object-cover mr-4"
            />
            <div className="flex-1">
              <Link to={course._id}>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {course.tagline}
                </p>
              </Link>
            </div>
             <div className="flex items-center space-x-2 mt-2">
                <span className="text-sm font-bold text-red-500 line-through">
                  ₹{course.price + 490}
                </span>
                <span className="text-sm font-bold text-green-600">
                  ₹{course.price}
                </span>
              </div>
          </li>
        ))}
      </ul>
    </div>
        </Layout>
    );
  }
  