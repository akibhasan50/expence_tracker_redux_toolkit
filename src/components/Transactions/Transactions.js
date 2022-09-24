import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "../../features/transaction/transactionSlice";
import Transaction from "./Transaction";

export default function Transactions() {
  const { transactions, isLoading, isError, error } = useSelector(
    (state) => state.transaction
  );
  const dispatch = useDispatch();

  useEffect( () =>{
dispatch(fetchTransactions())
  },[dispatch])
  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  }
  if (!isLoading && isError) {
    content = <p>There was an error occurred</p>;
  }
  if (!isLoading && !isError && transactions.length > 0) {
    content = transactions.map((transaction) => {
      return (
        <Transaction
          key={transaction.id}
          transaction={transaction}
        ></Transaction>
      );
    });
  }
  if (!isLoading && !isError && transactions.length === 0) {
    content = <p>No transactions were found</p>;
  }
  return (
    <>
      <p className="second_heading">Your Transactions:</p>

      <div className="conatiner_of_list_of_transactions">
        <ul>{content}</ul>
      </div>
    </>
  );
}
