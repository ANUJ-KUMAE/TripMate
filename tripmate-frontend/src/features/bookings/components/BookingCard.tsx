import { Calendar, Users, MapPin } from 'lucide-react'
import { formatCurrency, formatDateRange } from '@/utils/formatters'
import type { Booking } from '../types/booking.types'

interface BookingCardProps {
  booking: Booking
  onCancel?: (id: string) => void
}

export function BookingCard({ booking, onCancel }: BookingCardProps) {
  const isCancellable = booking.status === 'confirmed' || booking.status === 'pending'

  return (
    <div className="booking-card">
      <div className="booking-card-image-wrapper">
        <img
          src={booking.property.image}
          alt={booking.property.title}
          className="booking-card-image"
        />
        <span className={`booking-status-badge status-${booking.status}`}>
          {booking.status}
        </span>
      </div>

      <div className="booking-card-info">
        <h3 className="booking-property-title">{booking.property.title}</h3>

        <p className="booking-property-location">
          <MapPin size={14} />
          <span>{booking.property.city}, {booking.property.country}</span>
        </p>

        <div className="booking-meta">
          <div className="booking-meta-item">
            <Calendar size={14} />
            <span>{formatDateRange(booking.startDate, booking.endDate)}</span>
          </div>
          <div className="booking-meta-item">
            <Users size={14} />
            <span>{booking.guestCount} {booking.guestCount === 1 ? 'guest' : 'guests'}</span>
          </div>
        </div>

        <div className="booking-card-footer">
          <div className="booking-total-price">
            <span className="price-label">Total</span>
            <span className="price-val">
              {formatCurrency(booking.totalPrice, booking.currency)}
            </span>
          </div>

          {isCancellable && onCancel && (
            <button
              type="button"
              className="btn-cancel-booking"
              onClick={() => onCancel(booking.id)}
            >
              Cancel Reservation
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

