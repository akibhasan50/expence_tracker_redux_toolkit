import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getTransactions,
  addTransaction,
  editTransaction,
  deleteTransaction,
} from "./transactionAPI";
const initialState = {
  transactions: [],
  editing: {},
  isLoading: false,
  isError: false,
  error: "",
};

export const fetchTransactions = createAsyncThunk(
  "transaction/fetchTransactions",
  async () => {
    const response = await getTransactions();
    return response;
  }
);
export const createTransaction = createAsyncThunk(
  "transaction/createTransaction",
  async (data) => {
    const response = await addTransaction(data);
    return response;
  }
);
export const changeTransaction = createAsyncThunk(
  "transaction/changeTransaction",
  async (payload) => {
    const { id, data } = payload;
    console.log(id);
    const response = await editTransaction({ id, data });
    return response;
  }
);
export const removeTransaction = createAsyncThunk(
  "transaction/removeTransaction",
  async (id) => {
    const response = await deleteTransaction(id);
    return response;
  }
);

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    editActive: (state, action) => {
      state.editing = action.payload;
    },
    editInActive: (state, action) => {
      state.editing = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state, action) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.transactions = [];
        state.error = action.error.message;
      })
      .addCase(createTransaction.pending, (state, action) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.transactions.push(action.payload);
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      })
      .addCase(changeTransaction.pending, (state, action) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(changeTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;

        const indexToUpdate = state.transactions.findIndex(
          (t) => t.id === action.payload.id
        );
        state.transactions[indexToUpdate] = action.payload;
      })
      .addCase(changeTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      })
      .addCase(removeTransaction.pending, (state, action) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(removeTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;

        state.transactions = state.transactions.filter(
          (t) => t.id !== action.meta.arg
        );
      })
      .addCase(removeTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      });
  },
});

export default transactionSlice.reducer;
export const { editActive, editInActive } = transactionSlice.actions;
