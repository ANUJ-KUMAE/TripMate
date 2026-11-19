import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { STORAGE_KEYS } from '@/constants/storageKeys'
import { storage } from '@/utils/storage'
import type { AuthResponse, AuthState, User } from '../types/auth.types'

const initialToken = storage.get<string>(STORAGE_KEYS.ACCESS_TOKEN)
const initialUser = storage.get<User>(STORAGE_KEYS.USER_DATA)

const initialState: AuthState = {
  user: initialUser,
  accessToken: initialToken,
  isAuthenticated: Boolean(initialToken),
  isLoading: false,
  error: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authStart(state) {
      state.isLoading = true
      state.error = null
    },
    authSuccess(state, action: PayloadAction<AuthResponse>) {
      state.isLoading = false
      state.isAuthenticated = true
      state.user = action.payload.user
      state.accessToken = action.payload.tokens.accessToken
      state.error = null

      storage.set(STORAGE_KEYS.ACCESS_TOKEN, action.payload.tokens.accessToken)
      storage.set(STORAGE_KEYS.REFRESH_TOKEN, action.payload.tokens.refreshToken)
      storage.set(STORAGE_KEYS.USER_DATA, action.payload.user)
    },
    authFailure(state, action: PayloadAction<string>) {
      state.isLoading = false
      state.error = action.payload
    },
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload
      storage.set(STORAGE_KEYS.USER_DATA, action.payload)
    },
    logout(state) {
      state.user = null
      state.accessToken = null
      state.isAuthenticated = false
      state.isLoading = false
      state.error = null

      storage.remove(STORAGE_KEYS.ACCESS_TOKEN)
      storage.remove(STORAGE_KEYS.REFRESH_TOKEN)
      storage.remove(STORAGE_KEYS.USER_DATA)
    },
  },
})

export const { authStart, authSuccess, authFailure, setUser, logout } = authSlice.actions
export default authSlice.reducer

