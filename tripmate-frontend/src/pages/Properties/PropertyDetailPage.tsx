import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Star, MapPin, Users, Bed, Bath, Shield, ArrowLeft } from 'lucide-react'
import { ROUTES } from '@/constants/routes'
import { formatCurrency } from '@/utils/formatters'
import { Button } from '@/components/common/Button'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { addBooking } from '@/features/bookings/slices/bookingSlice'

function generateBookingId(): string {
  return `book-${Date.now()}`
}

function getBookingTimestamp(): string {
  return new Date().toISOString()
}

export function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { isAuthenticated } = useAppSelector((state) => state.auth)

  const [startDate, setStartDate] = useState('2026-12-01')
  const [endDate, setEndDate] = useState('2026-12-05')
  const [guestCount, setGuestCount] = useState(2)

  // Demo property details
  const property = {
    id: id || 'prop-1',
    title: 'Seaside Sunset Villa with Private Infinity Pool',
    description:
      'Immerse yourself in coastal luxury. This beachfront sanctuary offers uninterrupted panoramic ocean views, private heated infinity pool, chef-grade kitchen, and curated luxury amenities. Just steps away from pristine sand.',
    location: { city: 'Malibu', country: 'United States', address: '102 Ocean Boulevard' },
    pricePerNight: 450,
    currency: 'USD',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
    ],
    maxGuests: 6,
    bedrooms: 3,
    beds: 4,
    bathrooms: 3,
    rating: 4.95,
    reviewCount: 48,
    host: { name: 'Elena Rostova', isSuperhost: true },
  }

  const nights = 4
  const totalPrice = property.pricePerNight * nights

  const handleBook = () => {
    if (!isAuthenticated) {
      navigate(ROUTES.LOGIN)
      return
    }

    dispatch(
      addBooking({
        id: generateBookingId(),
        propertyId: property.id,
        userId: 'current-user',
        startDate,
        endDate,
        totalNights: nights,
        guestCount,
        totalPrice,
        currency: property.currency,
        status: 'confirmed',
        property: {
          id: property.id,
          title: property.title,
          city: property.location.city,
          country: property.location.country,
          image: property.images[0],
        },
        createdAt: getBookingTimestamp(),
      }),
    )

    navigate(ROUTES.MY_TRIPS)
  }

  return (
    <div className="property-detail-page container">
      <Link to={ROUTES.PROPERTIES} className="back-link">
        <ArrowLeft size={16} />
        <span>Back to listings</span>
      </Link>

      <div className="detail-header">
        <h1 className="detail-title">{property.title}</h1>
        <div className="detail-sub-meta">
          <div className="meta-rating">
            <Star size={16} fill="currentColor" />
            <span>{property.rating}</span>
            <span className="meta-reviews">({property.reviewCount} reviews)</span>
          </div>
          <span className="meta-dot">•</span>
          <div className="meta-location">
            <MapPin size={16} />
            <span>{property.location.city}, {property.location.country}</span>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="detail-gallery">
        <div className="gallery-main">
          <img src={property.images[0]} alt={property.title} />
        </div>
        <div className="gallery-side">
          <img src={property.images[1]} alt={property.title} />
          <img src={property.images[2]} alt={property.title} />
        </div>
      </div>

      {/* Main Content & Reservation Card */}
      <div className="detail-layout">
        <div className="detail-body">
          <div className="stay-spec-chips">
            <span className="chip"><Users size={16} /> {property.maxGuests} guests</span>
            <span className="chip"><Bed size={16} /> {property.bedrooms} bedrooms ({property.beds} beds)</span>
            <span className="chip"><Bath size={16} /> {property.bathrooms} baths</span>
          </div>

          <div className="detail-section">
            <h2>About this stay</h2>
            <p className="detail-description">{property.description}</p>
          </div>

          <div className="detail-section host-card">
            <h3>Hosted by {property.host.name}</h3>
            {property.host.isSuperhost && (
              <p className="superhost-badge">
                <Shield size={16} /> Superhost • Highly rated host committed to great stays
              </p>
            )}
          </div>
        </div>

        {/* Floating Reservation Widget */}
        <aside className="reservation-widget">
          <div className="widget-card">
            <div className="widget-price">
              <span className="price-big">{formatCurrency(property.pricePerNight, property.currency)}</span>
              <span className="price-sub"> / night</span>
            </div>

            <div className="date-picker-grid">
              <div className="date-input-wrap">
                <label>Check-in</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="date-input-wrap">
                <label>Check-out</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>

            <div className="guest-selector-wrap">
              <label>Guests</label>
              <select
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
              >
                {[...Array(property.maxGuests)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} {i === 0 ? 'guest' : 'guests'}
                  </option>
                ))}
              </select>
            </div>

            <Button
              variant="primary"
              size="lg"
              className="w-full reserve-btn"
              onClick={handleBook}
            >
              Reserve Stay
            </Button>

            <div className="price-breakdown">
              <div className="breakdown-row">
                <span>{formatCurrency(property.pricePerNight)} x {nights} nights</span>
                <span>{formatCurrency(totalPrice)}</span>
              </div>
              <div className="breakdown-row">
                <span>Cleaning fee</span>
                <span>$0 (Included)</span>
              </div>
              <div className="breakdown-total">
                <span>Total before taxes</span>
                <span>{formatCurrency(totalPrice, property.currency)}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
