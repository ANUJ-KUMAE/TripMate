import { combineReducers } from '@reduxjs/toolkit'
import authReducer from '@/features/auth/slices/authSlice'
import propertyReducer from '@/features/properties/slices/propertySlice'
import bookingReducer from '@/features/bookings/slices/bookingSlice'
import userReducer from '@/features/user/slices/userSlice'

export const rootReducer = combineReducers({
  auth: authReducer,
  properties: propertyReducer,
  bookings: bookingReducer,
  user: userReducer,
})

export type RootState = ReturnType<typeof rootReducer>

