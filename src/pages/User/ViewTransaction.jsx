import { useEffect, useState } from "react";
import ProfileLayout from "../../components/user/ProfileLayout";
import PageInfo from "../../components/common/PageInfo";
import Loading from "../../components/common/Loading";
import { getAllOrdersByUserAPI, cancelOrderAPI } from "../../api/user";
import { Badge } from "flowbite-react";
import {toast} from "react-hot-toast";
import Pagination from "../../components/common/Pagination";
import useDebounce from '../../hooks/useDebounce'

export default function ViewTransaction() {

    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [sort, setSort] = useState({ sort: "price", order: "asc" });
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [limit, setLimit] = useState(3);
    const [total, setTotal] = useState(0);

    const [sortOption, setSortOption] = useState("Price: Low to High");

    const debouncedSearch = useDebounce(search, 500);

    useEffect(() => {
      const fetchTransactions = async () => {
        try {
          setIsLoading(true);
          const query = `page=${page}&search=${debouncedSearch}&limit=${limit}&sort=${sort?.sort},${sort?.order}`;
          const { data } = await getAllOrdersByUserAPI(query);
          setTransactions(data.data);
          setTotal(data.total);
        } catch (error) {
          console.error("Error fetching transactions:", error);
          toast.error("Failed to fetch transactions");
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchTransactions();
    }, [sort, page, debouncedSearch, limit]);

    const handleCancelOrder = async (orderId) => {
      try {
        console.log('Attempting to cancel order with ID:', orderId);  // Log the orderId being sent to API
        const result = await cancelOrderAPI(orderId);  // Pass orderId directly, no need to wrap in an object
        if (result.status === 200) {
          toast.success("Order canceled successfully");
          setTransactions((prevTransactions) =>
            prevTransactions.map((transaction) =>
              transaction._id === orderId
                ? { ...transaction, status: "canceled", enrolled: false }
                : transaction
            )
          );
        } else {
          toast.error(result.data.error || "Failed to cancel order");
        }
      } catch (error) {
        console.log('Error in handleCancelOrder:', error.message);
        toast.error("Something went wrong");
      }
    };
    
    const isWithinSevenDays = (createdAt) => {
      const oneDaysInMs = 24 * 60 * 60 * 1000;
      const orderTime = new Date(createdAt);
      const currentTime = new Date();
      return currentTime - orderTime <= oneDaysInMs;
    };

    const handleSortChange = (e) => {
      const selectedOption = e.target.value;
      setSortOption(selectedOption);
    
      let sortCriteria;
      switch (selectedOption) {
        case "completed":
          sortCriteria = { sort: "price", order: "asc" };
          break;
        case "pending":
          sortCriteria = { sort: "price", order: "desc" };
          break;
        case "canceled":
          sortCriteria = { sort: "title", order: "asc" };
          break;
        default:
          sortCriteria = { sort: "createdAt", order: "desc" }; // Default fallback
      }
    
      setSort(sortCriteria);
    };    

    return (
      <>
      <ProfileLayout>
        <div className="bg-gray-50 min-h-screen py-10">
  <div className="max-w-4xl mx-auto px-4">
    {/* Header Section */}
    <div className="text-center mb-10">
      <h2 className="text-4xl font-bold text-indigo-500">Transaction History</h2>
      <p className="mt-2 text-gray-500 text-lg">
        View and manage your course transactions.
      </p>
      <p className="text-sm text-red-500 mt-2">
        Orders can be canceled within 24 hours of purchase.
      </p>
    </div>

    {/* Filters */}
    <div className="flex justify-between items-center mb-6">
      <input
        type="text"
        placeholder="Search transactions..."
        className="border border-gray-300 rounded-lg px-4 py-2 w-1/3 placeholder:text-gray-600"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select
        className="border border-gray-300 rounded-lg px-4 py-2"
        value={sortOption}
        onChange={handleSortChange}
      >
        <option value="" disabled>
          Filter by Status
        </option>
        <option value="completed">Completed</option>
        <option value="canceled">Canceled</option>
        <option value="failed">Failed</option>
      </select>
    </div>

    {/* Transactions List */}
    <div className="space-y-6">
      {isLoading ? (
        <Loading />
      ) : transactions.length ? (
        transactions.map((transaction) => (
          <div
            key={transaction._id}
            className="border rounded-lg shadow-md p-6 flex justify-between items-center bg-white"
          >
            {/* Left Section */}
            <div className="flex items-center space-x-4">
              <div className="bg-gray-100 p-4 rounded-lg text-center w-40 h-25 flex flex-col justify-center">
                <h3 className="text-xl font-semibold text-gray-700 capitalize">
                  {transaction.course?.title}
                </h3>
                <p className="text-sm text-gray-500">
                  {transaction.course?.tagline}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold capitalize">
                  {transaction.title}
                </h3>
                <p className="text-sm text-gray-500">{transaction.tagline}</p>
                <p className="text-2xl font-bold mt-2 text-indigo-600">
                  Price: ₹{transaction.course?.price}
                </p>
              </div>
            </div>

            {/* Right Section */}
            <div className="text-right">
              {transaction.status === "completed" ? (
                <div>
                  <p className="text-green-600 font-semibold text-lg">
                    Payment Successful
                  </p>
                  <p className="text-base text-gray-700">
                    {new Date(transaction.createdAt).toDateString()}
                  </p>
                  {isWithinSevenDays(transaction.createdAt) && (
                    <button
                      onClick={() => handleCancelOrder(transaction._id)}
                      className="mt-2 text-red-600 border border-red-600 px-3 py-1 rounded-md hover:bg-red-100"
                    >
                      Cancel Order
                    </button>
                  )}
                </div>
              ) : transaction.status === "canceled" ? (
                <div>
                <p className="text-red-600 font-semibold">Order Canceled</p>
                {transaction.createdAt ? (
                  <p className="text-base text-gray-700">
                  {new Date(transaction.createdAt).toDateString()}
                  </p>
                ) : (
                  <p className="text-base text-gray-500">Cancellation date unavailable</p>
                )}
              </div>
               
                
              ) : (
                <p className="text-yellow-500 font-semibold">Payment Failed</p>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center">
          <img
            src="/images/no-transactions.svg"
            alt="No Transactions"
            className="w-40 mx-auto mb-4"
          />
          <p className="text-gray-500 text-lg">No transactions yet.</p>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Browse Courses
          </button>
        </div>
      )}
    </div>
  </div>
</div>

          {/* Pagination */}
          <div className="">
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
      </ProfileLayout>
      </>
    );
  }
  