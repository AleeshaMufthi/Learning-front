import { useEffect, useState } from "react";
import { blockUserAPI, blockTutorAPI, unBlockTutorAPI, unBlockUserAPI, getAllUsersAPI } from "../../api/admin";
import { getAllTutorsAPI } from "../../api/tutor";
import timeAgo from "../../utils/timeAgo";
import { Toaster, toast } from "react-hot-toast";
import useDebounce from "../../hooks/useDebounce";
import Pagination from "../common/Pagination";

const  TableList = ({ tutor = false }) => {

  const [users, setUsers] = useState([]);
  const [updateData, setUpdateData] = useState(false);

      const [page, setPage] = useState(1);
      const [search, setSearch] = useState("");
      const [limit, setLimit] = useState(5);
      const [total, setTotal] = useState(0);

  const debouncedSearch = useDebounce(search, 500);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = `page=${page}&search=${debouncedSearch}&limit=${limit}`;
        const response = tutor
          ? await getAllTutorsAPI(query)
          : await getAllUsersAPI(query);
        console.log(response.data.data, 'responseeeeeeeeeeeeeeeeeeeeeeeeeeeee');
        
        setUsers(response.data.data);
        setTotal(response.data.total);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [tutor, updateData, page, debouncedSearch, limit]);

  const handleBlockUser = (userId) => {
    toast(
      <div className="flex flex-col items-center justify-center">
        Are you sure you want to block this user?
        <br />
        <div className="flex">
          <button
            className="rounded-md bg-red-600 px-2 py-1 m-2 text-md font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            onClick={() => handleConfirmedBlock(userId)}
          >
            Yes
          </button>
          <button
            className="rounded-md bg-green-600 px-2 py-1 m-2 text-md font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            onClick={() => toast.dismiss()}
          >
            No
          </button>
        </div>
      </div>,
      {
        duration: 6000,
      }
    );
    const handleConfirmedBlock = (userId) => {
      const blockAPI = tutor ? blockTutorAPI : blockUserAPI;

      blockAPI(userId)
        .then((response) => {
          toast.success("User blocked!", {
            duration: 6000, // 6 seconds
          });
          setUpdateData((prevUpdateData) => !prevUpdateData);
          console.log(response);
        })
        .catch((error) => {
          toast.error("Error blocking user!", {
            duration: 6000,
          });
          console.error("Error blocking user:", error);
        });

      toast.dismiss();
      toast.dismiss();
    };
  };

  const handleUnblockUser = (userId) => {
    toast(
      <div className="flex flex-col items-center justify-center">
        Are you sure you want to Unblock this user?
        <br />
        <div className="flex">
          <button
            className="rounded-md bg-red-600 px-2 py-1 m-2 text-md font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            onClick={() => handleConfirmedUnblock(userId)}
          >
            Yes
          </button>
          <button
            className="rounded-md bg-green-600 px-2 py-1 m-2 text-md font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            onClick={() => toast.dismiss()}
          >
            No
          </button>
        </div>
      </div>,
      {
        duration: 6000,
      }
    );
    const handleConfirmedUnblock = (userId) => {
      const unblockAPI = tutor ? unBlockTutorAPI : unBlockUserAPI;

      unblockAPI(userId)
        .then((response) => {
          toast.success("User Unblocked!", {
            duration: 6000, // 6 seconds
          });
          setUpdateData((prevUpdateData) => !prevUpdateData);
          console.log(response);
        })
        .catch((error) => {
          toast.error("Error Unblocking user!", {
            duration: 6000,
          });
          console.error("Error unblocking user:", error);
        });

      toast.dismiss();
      toast.dismiss();
    };
  };
  return (
   <>
      <Toaster />
      <div className="flex justify-between items-center mb-4">
      <input
        type="text"
        placeholder="Search instructors..."
        className="w-1/3 px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      </div>
     <div className="overflow-x-auto bg-gray-300 ">
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-500">
            <th className="px-4 py-2 text-left text-lg">Profile</th>
            <th className="px-4 py-2 text-left text-lg">Name</th>
            <th className="px-4 py-2 text-left text-lg">Member Since</th>
            <th className="px-4 py-2 text-left text-lg">Status</th>
            <th className="px-4 py-2 text-left text-lg">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id} className="border-t">
                <td className="px-4 py-2">
                <img
                src={user.thumbnail || "https://i.pinimg.com/236x/76/f3/f3/76f3f3007969fd3b6db21c744e1ef289.jpg"}
                alt={user.title}
                className="w-16 h-16 rounded-full object-cover"
              />
                </td>
                <td className="px-4 py-2">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </td>
                <td className="px-4 py-2">{new Date(user.createdAt).toDateString()}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded ${
                      user.isBlocked ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
                    }`}
                  >
                    {user.isBlocked ? "Blocked" : "Active"}
                  </span>
                </td>
                <td className="px-4 py-2">
                  {user.isBlocked ? (
                    <button
                      onClick={() => handleUnblockUser(user._id)}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-700"
                    >
                      Unblock
                    </button>
                  ) : (
                    <button
                      onClick={() => handleBlockUser(user._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-700"
                    >
                      Block
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4">
                No {tutor ? "Tutors" : "Users"} found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
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
   
              </>
  );
};
export default TableList;
