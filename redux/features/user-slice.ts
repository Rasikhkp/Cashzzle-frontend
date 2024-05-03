import { UserType } from "@/types"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState: { value: UserType | null } = {
  value: null
}

export const userSlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => {
      state.value = action.payload
    }
  }
})

export const { setUser } = userSlice.actions

export default userSlice.reducer
