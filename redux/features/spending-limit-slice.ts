import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type SpendingLimitType = {
  value: number
}

const initialState: SpendingLimitType = {
  value: 0
}

export const spendingLimitSlice = createSlice({
  name: "spending-limit",
  initialState,
  reducers: {
    setSpendingLimit: (state, action: PayloadAction<number>) => {
      state.value = action.payload
    },
  }
})

export const { setSpendingLimit } = spendingLimitSlice.actions

export default spendingLimitSlice.reducer
