import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeTransaction,
  createTransaction,
} from "../features/transaction/transactionSlice";
export default function Form() {
  const { transactions, isLoading, isError, error } = useSelector(
    (state) => state.transaction
  );
  const { editing } = useSelector((state) => state.transaction);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [editMode, setEditMode] = useState(false);

  const handleCreate = (e) => {
    e.preventDefault();
    dispatch(
      createTransaction({
        name,
        type,
        amount: Number(amount),
      })
    );
    reset();
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(
      changeTransaction({
        id: editing.id,
        data: {
          name,
          type,
          amount: Number(amount),
        },
      })
    );
    setEditMode(false);
    reset();
  };
  const reset = () => {
    setName("");
    setType("");
    setAmount("");
  };
  const cancelEditMode = () => {
    setEditMode(false);
    reset();
  };

  useEffect(() => {
    const { id, name, amount, type } = editing || {};
    if (id) {
      setEditMode(true);
      setName(name);
      setType(type);
      setAmount(amount);
    } else {
      setEditMode(false);
      reset();
    }
  }, [editing]);
  return (
    <div className="form">
      <h3>Add new transaction</h3>
      <form onSubmit={editMode ? handleUpdate : handleCreate}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
            name="name"
            placeholder="enter title"
          />
        </div>

        <div className="form-group radio">
          <label>Type</label>
          <div className="radio_group">
            <input
              type="radio"
              value={type}
              required
              onChange={() => setType("income")}
              name="type"
              checked={type === "income"}
            />
            <label>Income</label>
          </div>
          <div className="radio_group">
            <input
              type="radio"
              value="expense"
              name="type"
              onChange={() => setType("expense")}
              placeholder="Expense"
              checked={type === "expense"}
            />
            <label>Expense</label>
          </div>
        </div>

        <div className="form-group">
          <label>Amount</label>
          <input
            type="number"
            placeholder="enter amount"
            required
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
          />
        </div>

        <button disabled={isLoading} className="btn" type="submit">
          {editMode ? " Update Transaction" : " Add Transaction"}
        </button>
        {!isLoading && isError && <p className="error">Error occurred</p>}
      </form>
      {editMode && (
        <button onClick={cancelEditMode} className="btn cancel_edit">
          Cancel Edit
        </button>
      )}
    </div>
  );
}
