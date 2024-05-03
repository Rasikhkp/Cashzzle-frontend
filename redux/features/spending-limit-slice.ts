import { SpendingLimitType } from "@/types"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type SpendingLimitsType = {
  values: SpendingLimitType[]
}

const initialState: SpendingLimitsType = {
  values: []
}

export const spendingLimitSlice = createSlice({
  name: "spending-limit",
  initialState,
  reducers: {
    addSpendingLimit: (state, action: PayloadAction<SpendingLimitType>) => {
      state.values.push(action.payload)
    },
    fillSpendingLimits: (state, action: PayloadAction<SpendingLimitType[]>) => {
      state.values = action.payload
    },
    updateSpendingLimit: (state, action: PayloadAction<SpendingLimitType>) => {
      state.values = state.values.map(e => {
        if (e.id === action.payload.id) {
          return { id: e.id, spendingLimit: action.payload.spendingLimit, date: action.payload.date }
        } else {
          return e
        }
      })
    },
    upsertSpendingLimit: (state, action: PayloadAction<SpendingLimitType>) => {
      if (!state.values) {
        state.values = [action.payload]

        return
      }

      const isExists = state.values?.some(e => e.date === action.payload.date)

      if (isExists) {
        state.values = state.values.map(e => {
          if (e.date === action.payload.date) {
            return { ...e, spendingLimit: action.payload.spendingLimit }
          } else {
            return e
          }
        })
      } else {
        state.values.push(action.payload)
      }
    }
  }
})

export const { addSpendingLimit, fillSpendingLimits, updateSpendingLimit, upsertSpendingLimit } = spendingLimitSlice.actions

export default spendingLimitSlice.reducer
