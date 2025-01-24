import { useState, useEffect } from "react";
import SectionTitle from "../../components/common/SectionTitle";
import HorizontalRule from "../../components/common/HorizontalRule";
import Loading from "../../components/common/Loading";
import { Link } from "react-router-dom";
import { Badge } from "flowbite-react";
import { getUserEnrolledCoursesAPI } from "../../api/user";
import { Dumy, UserViewCourse } from "../../api/link";
import useDebounce from "../../hooks/useDebounce";
import Pagination from "../../components/common/Pagination";
import { SearchIcon } from "lucide-react";

export default function Enrolled() {

    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [sort, setSort] = useState({ sort: "createdAt", order: "desc" });
    const [difficulty, setDifficulty] = useState([]);
    const [category, setCategory] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [limit, setLimit] = useState(3);
    const [total, setTotal] = useState(0);

    const [sortOption, setSortOption] = useState("Price: Low to High");
    
    const debouncedSearch = useDebounce(search, 500);

    useEffect(() => {
      const query = `page=${page}&sort=${sort.sort},${sort.order}&difficulty=${difficulty.toString()}&category=${category.toString()}&search=${debouncedSearch}&limit=${limit}`;
    
      getUserEnrolledCoursesAPI(query).then(({ data }) => {
        console.log(data.data, 'data.dataaa');
        
        setCourses(data.data);
        setTotal(data.total);
        setTimeout(() => setIsLoading(false), 1000);
      });
    }, [sort, page, debouncedSearch, difficulty, category, limit]);

    const handleSortChange = (e) => {
      const selectedOption = e.target.value;
      setSortOption(selectedOption);
  
      let sortCriteria = { sort: "createdAt", order: "desc" };
      if (selectedOption === "Price: Low to High") {
        sortCriteria = { sort: "price", order: "asc" };
      } else if (selectedOption === "Price: High to Low") {
        sortCriteria = { sort: "price", order: "desc" };
      } else if (selectedOption === "Alphabetical [A-Z]") {
        sortCriteria = { sort: "title", order: "asc" };
      } else if (selectedOption === "Alphabetical [Z-A]") {
        sortCriteria = { sort: "title", order: "desc" };
      } else if (selectedOption === "Newest") {
        sortCriteria = { sort: "createdAt", order: "desc" };
      }
  
      setSort(sortCriteria);
    };

    // useEffect(() => {
    //   getUserEnrolledCoursesAPI()
    //     .then((response) => {
    //       console.log(response.data.data,"=========================")
    //       setCourses(response.data.data);
    //       setTimeout(() => setIsLoading(false), 1000);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // }, []);

    return (
      <>
        <SectionTitle
          title="Enrolled Courses"
          description="Courses enrolled by you. Happy Learning!"
        />
        <HorizontalRule />

      
      {/* Search, Sort, and Pagination Controls */}
      <div className="flex justify-between items-center mb-8">
          {/* Search Bar */}
          <p></p>
  <input
    type="text"
    placeholder="Search courses..."
    className="w-2/2 px-8 py-2 ml-40 border border-gray-500 placeholder:text-gray-700 rounded-md shadow-lg focus:outline-2 focus:ring-2 focus:ring-blue-400"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
  {/* Sort Dropdown */}
  <select
    className="w-2/2 px-3 py-2 mr-10 bg-white border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
    value={sortOption}
    onChange={handleSortChange}
  >
    <option value="lowToHigh">Price: Low to High</option>
    <option value="highToLow">Price: High to Low</option>
    <option value="az">Alphabetical [A-Z]</option>
    <option value="za">Alphabetical [Z-A]</option>
    <option value="newest">Newest</option>
  </select>
</div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
          {isLoading ? (
            <Loading />
          ) : courses.length ? (
            courses.map((course) => (
              <div
                className="max-w-md block hover:shadow-2xl duration-300 bg-white border overflow-hidden border-gray-200 rounded-lg shadow-2xl dark:bg-white ml-14"
                key={course._id}
              >
                <div className="overflow-hidden">
                  <Link to={UserViewCourse(course._id)}>
                    <img
                      src={course.thumbnail}
                      alt="Product Image"
                      className="rounded-t-lg h-48 w-full object-coverrounded-t-lg duration-300 scale-105 min-h-[11rem] object-cover hover:scale-100 pb-3"
                    />
                  </Link>
                </div>
                <div className="px-8">
                  <Link to={Dumy}>
                    <h5 className="text-xl font-bold text-gray-800 truncate mb-1">
                      {course.title}
                    </h5>
                    <span className="text-sm font-semibold tracking-tight text-gray-600 nexa-font pb-3">
                      {course.tagline}
                    </span>
                  </Link>
                
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col items-start justify-start">
                      
                      <span className="text-xl font-bold text-green-600">
                        ₹{course.price}
                      </span>
                    </div>
                    <Link
                      to={`/courses/enrolled/${course._id}`}
                      className="block text-center bg-indigo-500 hover:bg-indigo-700 text-white py-2 px-6 rounded-md mb-8"
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

      </>
    );
  }
  