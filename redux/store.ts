import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./features/categories-slice";

export const store = configureStore({
    reducer: {
        category: categoriesReducer
    }
})

type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const getCategories = (state: RootState) => state.category.values
