import { useDispatch } from "react-redux";
import deleteImage from "../../assets/images/delete.svg";
import editImage from "../../assets/images/edit.svg";
import {
  editActive,
  removeTransaction,
} from "../../features/transaction/transactionSlice";

export default function Transaction({ transaction }) {
  const { name, type, amount, id } = transaction || {};
  const dispatch = useDispatch();

  const handleEdit = (e) => {
    dispatch(editActive(transaction));
  };
  const handleDelete = (e) => {
    dispatch(removeTransaction(id));
  };
  return (
    <li className={`transaction ${type}`}>
      <p>{name}</p>
      <div className="right">
        <p>৳ {amount}</p>
        <button onClick={handleEdit} className="link">
          <img alt="Edit" className="icon" src={editImage} />
        </button>
        <button onClick={handleDelete} className="link">
          <img alt="Delete" className="icon" src={deleteImage} />
        </button>
      </div>
    </li>
  );
}
