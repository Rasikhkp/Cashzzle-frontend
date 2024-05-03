import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./features/categories-slice";
import transactionReducer from "./features/transactions-slice";
import spendingLimitReducer from "./features/spending-limit-slice";
import userReducer from "./features/user-slice"
import { getMonthDates } from "@/lib/date";
import { format } from "date-fns";

export const store = configureStore({
  reducer: {
    category: categoriesReducer,
    transaction: transactionReducer,
    spendingLimit: spendingLimitReducer,
    user: userReducer
  }
})

type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const getCategories = (state: RootState) => state.category.values
export const getTransactions = (state: RootState) => state.transaction.values
export const getCurrentDate = (state: RootState) => state.transaction.currentDate
export const getSpendingLimits = (state: RootState) => state.spendingLimit.values
export const getUser = (state: RootState) => state.user.value

export const getCurrentSpendingLimit = (state: RootState) => {
  return state.spendingLimit.values?.find(s => s.date === format(state.transaction.currentDate, "MM-yy"))?.spendingLimit
}

export const getBalance = (state: RootState) => {
  let balance = 0

  state.transaction.values.forEach(t => {
    if (t.type === "income") {
      balance += Number(t.price)
    } else {
      balance -= Number(t.price)
    }
  })

  return balance
}

export const getIncome = (state: RootState) => {
  let income = 0

  state.transaction.values.forEach(t => {
    if (t.type === "income" && getMonthDates(new Date(state.transaction.currentDate)).some(d => format(d, "MM-yy") === format(t.time, 'MM-yy'))) {
      income += Number(t.price)
    }
  })

  return income
}

export const getSpending = (state: RootState) => {
  let spending = 0

  state.transaction.values.forEach(t => {
    if (t.type === "spending" && getMonthDates(new Date(state.transaction.currentDate)).some(d => format(d, "MM-yy") === format(t.time, 'MM-yy'))) {
      spending += Number(t.price)
    }
  })

  return spending
}
