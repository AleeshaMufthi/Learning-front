import { useEffect, useState } from "react";
import { blockUserAPI, blockTutorAPI, unBlockTutorAPI, unBlockUserAPI, getAllTutorsAPI, getAllUsersAPI } from "../../api/admin";
import timeAgo from "../../utils/timeAgo";
import { Toaster, toast } from "react-hot-toast";

const TableList = ({ tutor = false }) => {
    
    const [users, setUsers] = useState([]);
    const [updateData, setUpdateData] = useState(false);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = tutor
            ? await getAllTutorsAPI()
            : await getAllUsersAPI();
          console.log(response.data);
          setUsers(response.data.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
    }, [tutor, updateData]);
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
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2 5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7 5 xl:pb-1">
        <Toaster />
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white xll:pl-11">
                  {tutor ? "Tutors" : "Users"}
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white xll:pl-11">
                  Member Since
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white xll:pl-11">
                  Status
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white xll:pl-11">
                  {tutor ? "Courses" : "Enrolled"}
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white xll:pl-11">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.length ? (
                users.map((user) => (
                  <tr key={user._id}>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      <h5 className="font-medium text-black dark:text-white">
                        {user.name}
                      </h5>
                      <p className="text-sm">{user.email}</p>
                      <p className="text-sm">
                        {tutor ? user.tutorname : user.username}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {new Date(user.createdAt).toDateString()}
                      </p>
                      <p className="dark:text-white text-gray-400">
                        {timeAgo(user.createdAt)} Ago
                      </p>
                    </td>
  
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-sm font-medium text-success">
                        {user.isBlocked ? (
                          <span className="text-red-500 nexa-font">Blocked</span>
                        ) : (
                          <span className="text-hgreen-400 nexa-font">
                            Active
                          </span>
                        )}
                      </p>
                    </td>
  
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">0</p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div className="flex items-center space-x-3.5 text-center">
                        {user.isBlocked ? (
                          <span
                            onClick={() => handleUnblockUser(user._id)}
                            className="focus:outline-none text-white bg-red-700 hover:bg-red-900 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-1.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                          >
                            UnBlock
                          </span>
                        ) : (
                          <span
                            onClick={() => handleBlockUser(user._id)}
                            className="focus:outline-none text-white bg-indigo-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-1.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                          >
                            Block
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <>No Members Present</>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  export default TableList;