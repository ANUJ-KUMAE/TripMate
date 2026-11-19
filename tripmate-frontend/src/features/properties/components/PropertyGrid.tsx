import type { Property } from '../types/property.types'
import { PropertyCard } from './PropertyCard'

interface PropertyGridProps {
  properties: Property[]
}

export function PropertyGrid({ properties }: PropertyGridProps) {
  if (properties.length === 0) {
    return (
      <div className="property-grid-empty">
        <p>No properties found matching your criteria.</p>
      </div>
    )
  }

  return (
    <div className="property-grid">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  )
}

