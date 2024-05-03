import { TransactionType } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type TransactionsType = {
  values: TransactionType[];
  currentDate: Date | string;
}

const initialState: TransactionsType = {
  values: [],
  currentDate: new Date().toISOString()
}

export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<TransactionType>) => {
      state.values.push(action.payload)
    },
    fillTransactions: (state, action: PayloadAction<TransactionType[]>) => {
      state.values = action.payload
    },
    deleteTransaction: (state, action: PayloadAction<string>) => {
      state.values = state.values.filter(e => e.id !== action.payload)
    },
    updateTransaction: (state, action: PayloadAction<TransactionType>) => {
      state.values = state.values.map(e => {
        if (e.id === action.payload.id) {
          return action.payload
        } else {
          return e
        }
      })
    },
    setCurrentDate: (state, action: PayloadAction<Date>) => {
      state.currentDate = action.payload
    }
  }
})

export const { addTransaction, fillTransactions, deleteTransaction, updateTransaction, setCurrentDate } = transactionSlice.actions

export default transactionSlice.reducer
