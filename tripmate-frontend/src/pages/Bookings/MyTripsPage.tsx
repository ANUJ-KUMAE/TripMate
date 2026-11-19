import { Link } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { useAppSelector } from '@/app/hooks'
import { BookingCard } from '@/features/bookings/components/BookingCard'
import { EmptyState } from '@/components/feedback/EmptyState'
import { Button } from '@/components/common/Button'

export function MyTripsPage() {
  const { myBookings } = useAppSelector((state) => state.bookings)

  return (
    <div className="my-trips-page container">
      <div className="page-header">
        <h1 className="page-title">My Trips & Reservations</h1>
        <p className="page-subtitle">View and manage your upcoming and completed getaways</p>
      </div>

      {myBookings.length === 0 ? (
        <EmptyState
          title="No trips booked... yet!"
          description="Time to dust off your bags and start planning your next getaway."
          action={
            <Link to={ROUTES.PROPERTIES}>
              <Button variant="primary">Explore Stays</Button>
            </Link>
          }
        />
      ) : (
        <div className="bookings-grid">
          {myBookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </div>
      )}
    </div>
  )
}

