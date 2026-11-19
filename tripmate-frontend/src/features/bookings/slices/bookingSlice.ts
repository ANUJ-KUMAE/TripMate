import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Booking, BookingState } from '../types/booking.types'

const initialState: BookingState = {
  myBookings: [],
  currentBooking: null,
  isLoading: false,
  error: null,
}

export const bookingSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload
    },
    setMyBookings(state, action: PayloadAction<Booking[]>) {
      state.myBookings = action.payload
      state.isLoading = false
      state.error = null
    },
    addBooking(state, action: PayloadAction<Booking>) {
      state.myBookings.unshift(action.payload)
      state.currentBooking = action.payload
    },
    updateBookingStatus(state, action: PayloadAction<{ id: string; status: Booking['status'] }>) {
      const booking = state.myBookings.find((b) => b.id === action.payload.id)
      if (booking) {
        booking.status = action.payload.status
      }
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload
      state.isLoading = false
    },
  },
})

export const { setLoading, setMyBookings, addBooking, updateBookingStatus, setError } =
  bookingSlice.actions

export default bookingSlice.reducer

