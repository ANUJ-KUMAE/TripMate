import { apiClient } from '@/services/api/apiClient'
import { API_ENDPOINTS } from '@/constants/apiEndpoints'
import type { ApiResponse } from '@/types/api.types'
import type { Booking, CreateBookingPayload } from '../types/booking.types'

export const bookingService = {
  async getMyBookings(): Promise<Booking[]> {
    const response = await apiClient.get<ApiResponse<Booking[]>>(API_ENDPOINTS.BOOKINGS.MY_BOOKINGS)
    return response.data.data
  },

  async createBooking(payload: CreateBookingPayload): Promise<Booking> {
    const response = await apiClient.post<ApiResponse<Booking>>(API_ENDPOINTS.BOOKINGS.BASE, payload)
    return response.data.data
  },

  async cancelBooking(id: string): Promise<Booking> {
    const response = await apiClient.post<ApiResponse<Booking>>(API_ENDPOINTS.BOOKINGS.CANCEL(id))
    return response.data.data
  },
}

