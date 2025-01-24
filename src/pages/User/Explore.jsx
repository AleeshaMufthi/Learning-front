import { useEffect, useState } from "react";
import Loading from "../../components/common/Loading";
import { Link } from "react-router-dom";
import { getAllCategoriesAPI, getAllCourseByFilter } from "../../api/common";
import { Badge } from "flowbite-react";
import Pagination from "../../components/common/Pagination";
import useDebounce from '../../hooks/useDebounce'

export default function Explore() {
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState([]);
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
  
    getAllCourseByFilter(query).then(({ data }) => {
      
      setCourses(data.data);
      setTotal(data.total);
      setTimeout(() => setIsLoading(false), 1000);
    });
  }, [sort, page, debouncedSearch, difficulty, category, limit]);

  useEffect(() => {
    getAllCategoriesAPI().then(({ data }) => {
      const options = data.category.map((category) => {
        return {
          value: category.title,
          checked: false,
        };
      });
      filters[1].options = [...options];
    });
  }, []);

  const handleSortChange = (e) => {
    const selectedOption = e.target.value;
    setSortOption(selectedOption);

    let sortCriteria = { sort: "price", order: "asc" }; // Default to Price: Low to High
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
    } else if (selectedOption === "Most popular") {
      sortCriteria = { sort: "popularity", order: "desc" }; // Assuming `popularity` field exists
    }

    setSort(sortCriteria);
  };
  

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-400 py-12 text-white text-center">
        <h1 className="text-4xl font-bold mb-2">Explore Our Courses</h1>
        <p className="text-lg">
          Find the perfect course to upskill and achieve your goals.
        </p>
      </div>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        <section className="py-10">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-700">Available Courses</h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Search courses..."
                className="block w-full px-4 py-2 border border-gray-500 placeholder:text-gray-700 rounded-md shadow-md focus:outline-2 focus:ring-2 focus:ring-blue-400"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

                <div className="relative">
                  <select
                  className="block w-full px-3 py-2 bg-white border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={sortOption}
                  onChange={handleSortChange}
                  >
                               <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Alphabetical [A-Z]</option>
                <option>Alphabetical [Z-A]</option>
                <option>Newest</option>
                </select>
                </div>
      </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              <Loading />
            ) : courses.length ? (
              courses.map((course) => (
                <div
                  key={course._id}
                  className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                >
                  <Link to={`/courses/${course._id}`}>
                    <img
                      src={course.thumbnailURL}
                      alt={course.title}
                      className="rounded-t-lg h-48 w-full object-cover"
                    />
                  </Link>
                  <div className="p-5">
                    <Link to={`/courses/${course._id}`}>
                      <h3 className="text-xl font-bold text-gray-800 truncate mb-2">
                        {course.title}
                      </h3>
                      <p className="text-gray-600 text-sm">{course.tagline}</p>
                    </Link>

                    <div className="flex justify-between items-center mt-4">
                      <Badge
                        color={
                          course.difficulty === "expert" || course.difficulty === "advanced"
                            ? "warning"
                            : "indigo"
                        }
                        className="capitalize"
                      >
                        {course.difficulty}
                      </Badge>
                      <span className="text-xl font-bold text-green-600">₹{course.price}</span>
                    </div>

                    <Link
                      to={`/courses/${course._id}`}
                      className="mt-4 block text-center bg-indigo-500 hover:bg-indigo-700 text-white py-2 px-4 rounded-md"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500">
                <h2>No courses found!!!</h2>
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
        </section>
      </main>
    </div>
  );
}
