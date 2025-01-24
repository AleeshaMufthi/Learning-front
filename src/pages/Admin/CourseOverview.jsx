import { useState, useEffect } from "react";
import { getAllCourseByFilter } from "../../api/common";
import Layout from "../../components/admin/Layout";
import PageInfo from "../../components/common/PageInfo";
import Pagination from "../../components/common/Pagination";
import useDebounce from '../../hooks/useDebounce'

export default function CourseOverview() {

    const [courses, setCourses] = useState([]);

    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [limit, setLimit] = useState(5);
    const [total, setTotal] = useState(0);

    const debouncedSearch = useDebounce(search, 500);

    useEffect(() => {
      const query = `page=${page}&search=${debouncedSearch}&limit=${limit}`;
    console.log(query, 'gfsdhjdgsjhdgs');
    
      getAllCourseByFilter(query).then(({ data }) => {
        console.log(data,'dataaaa');
        
        setCourses(data.data);
        setTotal(data.total);
      });
    }, [page, debouncedSearch,limit]);

    // useEffect(() => {
    //   (async () => {
    //     getAllCoursesAPI()
    //       .then((response) => {
    //         setCourses(response.data.data);
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //       });
    //   })();
    // }, []);

    return (
    <Layout>
    <PageInfo admin pageName={"Courses Overview"} />
    <div className="relative">
              <input
                type="text"
                placeholder="Search courses..."
                className="block w-full px-4 py-2 border border-gray-500 placeholder:text-gray-700 rounded-md shadow-md focus:outline-2 focus:ring-2 focus:ring-blue-400"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
    </div>
   
    <div className="overflow-x-auto mt-5">
    <table className="table-auto w-full border-collapse border dark:border-gray-700">
      <thead>
        <tr className="bg-gray-100 dark:bg-gray-400">
          <th className="px-4 py-2 text-left font-medium text-lg text-black">
            Thumbnail
          </th>
          <th className="px-4 py-2 text-left font-medium text-lg text-black">
            Course Name & Description
          </th>
          <th className="px-4 py-2 text-left text-lg text-black font-medium">
            Created Date
          </th>
          <th className="px-4 py-2 text-left text-lg text-black font-medium">
            Tutor
          </th>
          <th className="px-4 py-2 text-left text-lg text-black font-medium">
            Price
          </th>
        </tr>
      </thead>
      <tbody>
        {courses.map((course) => (
          <tr
            key={course._id}
            className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <td className="px-4 py-2">
              <img
                src={course.thumbnailURL}
                alt={course.title}
                className="w-16 h-16 rounded-full object-cover"
              />
            </td>
            <td className="px-4 py-2">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                {course.title}
              </h3>
              <p className="text-md text-gray-600 dark:text-gray-400">
                {course.tagline}
              </p>
            </td>
            <td className="px-4 py-2 text-md text-gray-600 dark:text-gray-400">
              {new Date(course.createdAt).toLocaleDateString()}
            </td>
            <td className="px-4 py-2 text-md text-gray-600 dark:text-gray-400">
              {course.tutor.name}
            </td>
            <td className="px-4 py-2">
              <div className="flex items-center space-x-2">
                <span className="text-md font-bold text-green-600">
                  ₹{course.price}
                </span>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>


        {/* Pagination */}
        <div className="mt-10">
              <Pagination
                page={page}
                total={total} // Pass total pages
                limit={limit}
                setPage={(action) => {
                 if (action === "prev") setPage((prev) => Math.max(prev - 1, 1));
                    else if (action === "next")
                  setPage((prev) => Math.min(prev + 1, Math.ceil(total / limit)));
                  else setPage(action);
                }}
              />
              </div>

  </Layout>
  
    );
  }
  