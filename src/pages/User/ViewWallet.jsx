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
      <div className="mx-auto max-w-2xl relative text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">My Wallet</h2>
        {isLoading ? (
          <Loading />
        ) : (
          <div>
            <p className="text-xl pt-5">Balance: ₹{balance}</p>
            <div className="">
              {transactions.map((transaction) => (
                <div key={transaction._id} className="transaction-item">
                  <span>{transaction.description}</span>
                  <Badge color={transaction.amount > 0 ? "success" : "error"}>
                    ₹{transaction.amount}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ProfileLayout>
    );
  }