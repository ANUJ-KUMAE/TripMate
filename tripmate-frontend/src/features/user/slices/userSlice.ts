import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { UserProfile, UserState } from '../types/user.types'

const initialState: UserState = {
  profile: null,
  isLoading: false,
  error: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload
    },
    setUserProfile(state, action: PayloadAction<UserProfile>) {
      state.profile = action.payload
      state.isLoading = false
      state.error = null
    },
    setUserError(state, action: PayloadAction<string | null>) {
      state.error = action.payload
      state.isLoading = false
    },
  },
})

export const { setUserLoading, setUserProfile, setUserError } = userSlice.actions
export default userSlice.reducer

