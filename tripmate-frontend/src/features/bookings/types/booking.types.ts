export const BookingStatus = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
} as const

export type BookingStatus = (typeof BookingStatus)[keyof typeof BookingStatus]

export interface BookingPropertySummary {
  id: string
  title: string
  city: string
  country: string
  image: string
}

export interface Booking {
  id: string
  propertyId: string
  userId: string
  startDate: string
  endDate: string
  totalNights: number
  guestCount: number
  totalPrice: number
  currency: string
  status: BookingStatus
  property: BookingPropertySummary
  createdAt: string
}

export interface CreateBookingPayload {
  propertyId: string
  startDate: string
  endDate: string
  guestCount: number
}

export interface BookingState {
  myBookings: Booking[]
  currentBooking: Booking | null
  isLoading: boolean
  error: string | null
}

