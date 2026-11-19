import { Link } from 'react-router-dom'
import { Star, MapPin } from 'lucide-react'
import { ROUTES } from '@/constants/routes'
import { formatCurrency } from '@/utils/formatters'
import type { Property } from '../types/property.types'

interface PropertyCardProps {
  property: Property
}

export function PropertyCard({ property }: PropertyCardProps) {
  const thumbnail = property.images[0] || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80'

  return (
    <div className="property-card">
      <Link to={ROUTES.PROPERTY_DETAIL(property.id)} className="property-card-link">
        <div className="property-card-image-wrapper">
          <img
            src={thumbnail}
            alt={property.title}
            className="property-card-image"
            loading="lazy"
          />
        </div>

        <div className="property-card-content">
          <div className="property-card-header">
            <h3 className="property-card-title">{property.title}</h3>
            <div className="property-card-rating">
              <Star size={16} className="star-icon" fill="currentColor" />
              <span>{property.rating > 0 ? property.rating.toFixed(1) : 'New'}</span>
            </div>
          </div>

          <p className="property-card-location">
            <MapPin size={14} />
            <span>{property.location.city}, {property.location.country}</span>
          </p>

          <div className="property-card-price">
            <span className="price-amount">{formatCurrency(property.pricePerNight, property.currency)}</span>
            <span className="price-period"> / night</span>
          </div>
        </div>
      </Link>
    </div>
  )
}

