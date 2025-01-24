import { useState, useEffect } from "react";
import { getWalletBalanceAPI } from "../../api/user";
import Loading from "../../components/common/Loading";
import { Badge } from "flowbite-react";
import ProfileLayout from "../../components/user/ProfileLayout";
import PageInfo from "../../components/common/PageInfo";
import Pagination from "../../components/common/Pagination";

export default function Wallet() {
    const [balance, setBalance] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(6);
    const [total, setTotal] = useState(0);
  
    useEffect(() => {
      getWalletBalanceAPI()
        .then(({ data }) => {
          console.log(data, 'dataaaaaaaaaa');
          console.log(data.transactions, 'transactions');
          
          
          setBalance(data.balance);
          setTransactions(data.transactions);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log("Error fetching wallet details:", error);
        });
    }, []);
  
    return (
      <ProfileLayout>
<div className="wallet-page p-6 bg-gray-100 h-auto">
  {/* Header */}
  <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-5 rounded-lg shadow-lg mb-6">
    <h1 className="text-2xl font-bold">Wallet</h1>
    <p className="text-lg mt-2">
      Total Balance: <span className="text-3xl font-extrabold">₹{balance}</span>
    </p>
  </div>

  {/* Transactions */}
  <div className="transactions bg-white rounded-lg shadow-md p-4 mb-6">
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div
          key={transaction._id}
          className="transaction-item flex justify-between items-center border-b last:border-none pb-4 mb-4"
        >
          {/* Left Section */}
          <div>
            <h3 className="text-gray-800 font-semibold">{transaction.description}</h3>
            <p className="text-gray-700 text-md mt-3">
              Credited On: {new Date(transaction.createdAt).toDateString()}
            </p>
            <p className="text-gray-500 text-sm mt-1">
              Transaction ID: {transaction._id}
            </p>
          </div>

          {/* Right Section */}
          <div
            className={`px-4 py-2 rounded-lg font-bold text-lg ${
              transaction.amount > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            ₹{transaction.amount}
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
{/* Pagination */}
          <div className="pagination-wrapper mt-4 flex justify-center">
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
    );
  }