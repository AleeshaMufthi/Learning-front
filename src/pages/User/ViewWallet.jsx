import { useState, useEffect } from "react";
import { getWalletBalanceAPI } from "../../api/user";
import Loading from "../../components/common/Loading";
import { Badge } from "flowbite-react";
import ProfileLayout from "../../components/user/ProfileLayout";
import PageInfo from "../../components/common/PageInfo";

export default function Wallet() {
    const [balance, setBalance] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      getWalletBalanceAPI()
        .then(({ data }) => {
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
      <PageInfo pageName="Wallet" />
      <div>
  <p className="text-xl pt-5 font-bold">Total Balance: ₹{balance}</p>
  <div className="mt-4 space-y-4">
    {transactions.map((transaction) => (
      <div
        key={transaction._id}
        className="transaction-item border rounded-lg p-4 bg-gray-50 shadow-sm"
      >
        {/* Description */}
        <div className="mb-2">
          <span className="font-semibold text-gray-700">{transaction.description}</span>
        </div>
        {/* Transaction ID */}
        <div className="mb-2">
          <span className="font-semibold text-gray-700">Transaction ID: </span>
          <span className="text-gray-600">{transaction._id}</span>
        </div>
        {/* Price */}
        <div>
          <Badge
            color={transaction.amount > 0 ? "success" : "error"}
            className="font-semibold text-lg"
          >Amount: 
            ₹{transaction.amount}
          </Badge>
        </div>
      </div>
    ))}
  </div>
</div>
    </ProfileLayout>
    );
  }