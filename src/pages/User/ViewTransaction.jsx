import { useEffect, useState } from "react";
import ProfileLayout from "../../components/common/ProfileLayout";
import PageInfo from "../../components/common/PageInfo";
import Loading from "../../components/common/Loading";
import { getAllOrdersByUserAPI, cancelOrderAPI } from "../../api/user";
import { Badge } from "flowbite-react";
import {toast} from "react-hot-toast";

export default function ViewTransaction() {

    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      getAllOrdersByUserAPI()
        .then(({ data }) => {
          console.log(data);
          setTransactions(data.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);

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
      const sevenDaysInMs = 5 * 24 * 60 * 60 * 1000;
      const orderTime = new Date(createdAt);
      const currentTime = new Date();
      return currentTime - orderTime <= sevenDaysInMs;
    };

    return (
      <>
      <ProfileLayout>
        <PageInfo pageName="Transactions" />
        <div>
          <div className="mx-auto max-w-2xl relative text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Manage Transaction
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              View Your Transactions
            </p>
          </div>
          <p className="text-sm text-red-600 text-center pt-5">Order can be canceled within 5 days from the date of purchase.</p>
          <div className="mt-16">
            {isLoading ? (
              <Loading />
            ) : transactions.length ? (
              <>
                <div className="flex flex-col-reverse gap-3">
                  {transactions.map((transaction) => (
                    <div
                      key={transaction._id}
                      className="min-w-2xl border rounded-xl overflow-hidden h-27 flex justify-between"
                    >
                      <div className="flex items-center">
                        <div className="md:w-60 sm:w-50 justify-center flex items-center text-center bg-gray-100 h-full">
                          <div>
                            <h1 className="text-xl capitalize">
                              {transaction?.course?.title}
                            </h1>
                            <span className="text-sm">
                              {transaction?.course?.tagline}
                            </span>
                          </div>
                        </div>
                        <div className="ml-5 first:capitalize">
                          <h1 className="text-xl capitalize">
                            {transaction?.title}
                          </h1>
                          <h1 className="text-sm">{transaction?.tagline}</h1>
                          <div className="flex mt-1 gap-2">
                            Current Price
                            <Badge
                              size="2"
                              color={"warning"}
                              className="w-fit capitalize"
                            >
                              {transaction?.course?.price}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 items-center mr-5">
                        {transaction.status === "completed" ? (
                          <div>
                            <div className="flex gap-2">
                              <Badge size="2" color="success">
                                ₹{transaction?.price}
                              </Badge>
                              <span className="ml-3 text-green-500">
                                Payment Successfull
                              </span>
                            </div>
                            <span className="text-xs text-green-800">
                              Payment Done On :
                              {new Date(transaction.createdAt).toDateString()}
                            </span>
                          </div>
                        ) : transaction.status === "canceled" ? (
                          <span className="text-red-500">Order Cancelled</span>
                        ) : (
                          <div className="flex flex-col justify-center items-center mr-5 gap-2">
                            <div>
                              <Badge
                                size="2"
                                className="w-fit float-left capitalize"
                              >
                                ₹{transaction.price}
                              </Badge>
                              <span className="ml-3 text-red-500">Failed</span>
                            </div>
                            <span className="text-xs text-gray-500">
                              {new Date(transaction.createdAt).toDateString()}
                            </span>
                          </div>
                        )}

                      {transaction.status === "completed" &&
                        isWithinSevenDays(transaction.createdAt) && (
                          <button
                            onClick={() => handleCancelOrder(transaction._id)}
                            className="text-red-500 border border-red-500 px-4 py-2 rounded-md hover:bg-red-100"
                          >
                            Cancel Order
                          </button>
                          
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex justify-center items-center">
                <p>you dont havent any transactions yet</p>
              </div>
            )}
          </div>
        </div>
      </ProfileLayout>
      </>
    );
  }
  