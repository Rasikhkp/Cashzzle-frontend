import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./features/categories-slice";
import transactionReducer from "./features/transactions-slice";
import spendingLimitReducer from "./features/spending-limit-slice";

export const store = configureStore({
    reducer: {
        category: categoriesReducer,
        transaction: transactionReducer,
        spendingLimit: spendingLimitReducer
    }
})

type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const getCategories = (state: RootState) => state.category.values
export const getTransactions = (state: RootState) => state.transaction.values
export const getCurrentDate = (state: RootState) => state.transaction.currentDate
export const getSpendingLimit = (state: RootState) => state.spendingLimit.value

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
        if (t.type === "income") {
            income += Number(t.price)
        }
    })

    return income
}

export const getSpending = (state: RootState) => {
    let spending = 0

    state.transaction.values.forEach(t => {
        if (t.type === "spending") {
            spending += Number(t.price)
        }
    })

    return spending
}
