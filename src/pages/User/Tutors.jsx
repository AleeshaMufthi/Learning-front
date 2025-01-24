import { Button } from "flowbite-react";
import { Card } from "flowbite-react";
import { Mail } from "lucide-react";
import { getAllTutorsAPI } from "../../api/tutor";
import { useState, useEffect } from "react";
import { Chat } from "../../api/link";
import { Link } from "react-router-dom";
import useDebounce from "../../hooks/useDebounce";
import Pagination from "../../components/common/Pagination";

export default function Tutors() {

    const [tutors, setTutors] = useState([]);

      const [page, setPage] = useState(1);
      const [search, setSearch] = useState("");
      const [limit, setLimit] = useState(5);
      const [total, setTotal] = useState(0);
    
    
      const debouncedSearch = useDebounce(search, 500);

      useEffect(() => {
        const query = `page=${page}&search=${debouncedSearch}&limit=${limit}`;
      
        getAllTutorsAPI(query).then(({ data }) => {
          console.log(data.data, 'datataaa');
          console.log(data.total, 'data.total');
          
          setTutors(data.data);
          setTotal(data.total);
          setTimeout(() => 1000);
        });
      }, [ page, debouncedSearch, limit]);



    return (

        <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-6">
          <h1 className="text-4xl font-bold mb-4">Meet our Expert Tutors</h1>
          <p className="text-xl text-muted-foreground">
            Meet our expert Tutors who are passionate about teaching and committed to helping you succeed.
          </p>
        </header>

        <div className="flex justify-center pb-5">
        <Link to={Chat}>
    <Button size="lg" className="bg-green-800 hover:bg-green-600">
      One-to-One Session with Tutors
    </Button>
  </Link>
        </div>
        
        <div className="relative">
              <input
                type="text"
                placeholder="Search instructors..."
                className="block w-3/4 py-2 px-3 text-sm border rounded-md shadow-xl border-gray-500 placeholder:text-gray-600 focus:outline-2 focus:ring-2 focus:ring-blue-400 mb-5 mx-auto"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
  
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
  {tutors.length > 0 ? (
    tutors.map((tutor, id) => (
      <Card key={id} className="overflow-hidden">
        <img
          src={tutor.thumbnail || "https://i.pinimg.com/236x/76/f3/f3/76f3f3007969fd3b6db21c744e1ef289.jpg"}
          alt={`Portrait of ${tutor.name}`}
          width={400}
          height={400}
          className="w-full h-48 rounded-md object-cover"
        />
        <div className="p-4 text-white">
          <h2 className="text-xl font-semibold mb-2">Prof. {tutor.name}</h2>
          <p className="text-sm text-muted-foreground mb-2">{tutor.about}</p>
          <p className="text-sm text-muted-foreground mb-2">Qualification: {tutor.qualification}</p>
          <div className="flex items-center text-sm">
            <Mail className="w-4 h-4 mr-2" />
            <a href={`mailto:${tutor.email}`} className="hover:underline">
              {tutor.email}
            </a>
          </div>
        </div>
      </Card>
    ))
  ) : (
    <p>No tutors found</p>
  )}
</div>

          {/* Pagination */}
                  <div className="mt-10">
                  <Pagination
                  page={page}
                  total={total} 
                  limit={limit}
                  setPage={(action) => {
              if (action === "prev") setPage((prev) => Math.max(prev - 1, 1));
                else if (action === "next")
                setPage((prev) => Math.min(prev + 1, Math.ceil(total / limit)));
                else setPage(action);
              }}
           />
          </div>
      </div>
    );
};
