import { CategoryType } from "@/types"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type CategoriesType = {
  values: CategoryType[]
}
const initialState: CategoriesType = {
  values: []
}

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<CategoryType>) => {
      state.values.push(action.payload)
    },
    fillCategories: (state, action: PayloadAction<CategoryType[]>) => {
      state.values = action.payload
    },
    deleteCategory: (state, action: PayloadAction<string>) => {
      state.values = state.values.filter(e => e.id !== action.payload)
    },
    updateCategory: (state, action: PayloadAction<CategoryType>) => {
      state.values = state.values.map(e => {
        if (e.id === action.payload.id) {
          return { id: e.id, icon: action.payload.icon, name: action.payload.name }
        } else {
          return e
        }
      })
    }
  }
})

export const { addCategory, fillCategories, deleteCategory, updateCategory } = categorySlice.actions

export default categorySlice.reducer
