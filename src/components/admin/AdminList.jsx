import { useState, useEffect } from "react";
import { blockTutorAPI, blockUserAPI, unBlockTutorAPI, unBlockUserAPI, getAllTutorsAPI, getAllUsersAPI } from "../../api/admin";
import timeAgo from "../../utils/timeAgo";

const AdminList = () => {

    const [users, setUsers] = useState([]);
    const [updateData, setUpdateData] = useState(false);
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await getAllAdminsAPI();
          console.log(response.data);
          setUsers(response.data.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }, [updateData]);
    
    const handleBlockUser = (userId) => {
      blockAdminAPI(userId)
        .then((response) => {
          setUpdateData((prevUpdateData) => !prevUpdateData);
          console.log(response);
        })
        .catch((error) => {
          console.error("Error blocking user:", error);
        });
    };
  
    const handleUnblockUser = (userId) => {
      unBlockAdminAPI(userId)
        .then((response) => {
          setUpdateData((prevUpdateData) => !prevUpdateData);
          console.log(response);
        })
        .catch((error) => {
          console.error("Error unblocking user:", error);
        });
    };
    return (
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2 5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7 5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white xll:pl-11">
                  Admin
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white xll:pl-11">
                  Member Since
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white xll:pl-11">
                  Status
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
                      <p className="text-sm">{user.adminname}</p>
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
                <>No Tutors Found</>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  export default AdminList;
  