import { useState } from 'react'
import { PropertyFilterBar } from '@/features/properties/components/PropertyFilterBar'
import { PropertyGrid } from '@/features/properties/components/PropertyGrid'
import type { Property, PropertyCategory } from '@/features/properties/types/property.types'

const ALL_PROPERTIES: Property[] = [
  {
    id: 'prop-1',
    title: 'Seaside Sunset Villa with Private Infinity Pool',
    description: 'Breathtaking ocean views, expansive deck, and private direct beach access.',
    category: 'beachfront',
    location: { city: 'Malibu', country: 'United States', address: '102 Ocean Boulevard' },
    pricePerNight: 450,
    currency: 'USD',
    images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'],
    maxGuests: 6,
    bedrooms: 3,
    beds: 4,
    bathrooms: 3,
    rating: 4.95,
    reviewCount: 48,
    amenities: [{ id: '1', name: 'Pool' }],
    host: { id: 'h-1', name: 'Elena Rostova', isSuperhost: true },
    createdAt: new Date().toISOString(),
  },
  {
    id: 'prop-2',
    title: 'Cozy Alpine A-Frame Cabin in Pine Woods',
    description: 'Immerse in nature with wood-burning fireplace, hot tub, and alpine hiking trails.',
    category: 'cabin',
    location: { city: 'Aspen', country: 'United States', address: '44 Pine Ridge Road' },
    pricePerNight: 280,
    currency: 'USD',
    images: ['https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80'],
    maxGuests: 4,
    bedrooms: 2,
    beds: 2,
    bathrooms: 1.5,
    rating: 4.89,
    reviewCount: 32,
    amenities: [{ id: '1', name: 'Hot Tub' }],
    host: { id: 'h-2', name: 'Marcus Vance', isSuperhost: false },
    createdAt: new Date().toISOString(),
  },
  {
    id: 'prop-3',
    title: 'Modern Minimalist Lakefront Retreat',
    description: 'Floor-to-ceiling glass walls overlooking crystal waters with private boat dock.',
    category: 'lakefront',
    location: { city: 'Lake Tahoe', country: 'United States', address: '77 Emerald Bay Way' },
    pricePerNight: 395,
    currency: 'USD',
    images: ['https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80'],
    maxGuests: 8,
    bedrooms: 4,
    beds: 5,
    bathrooms: 3.5,
    rating: 4.98,
    reviewCount: 64,
    amenities: [{ id: '1', name: 'Waterfront' }],
    host: { id: 'h-3', name: 'Sarah Jenkins', isSuperhost: true },
    createdAt: new Date().toISOString(),
  },
  {
    id: 'prop-4',
    title: 'Tuscan Hillside Stone Villa & Olive Grove',
    description: 'Authentic 18th century restored stone villa surrounded by ancient olive trees.',
    category: 'villa',
    location: { city: 'Florence', country: 'Italy', address: 'Via della Collina 12' },
    pricePerNight: 520,
    currency: 'USD',
    images: ['https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=800&q=80'],
    maxGuests: 10,
    bedrooms: 5,
    beds: 6,
    bathrooms: 5,
    rating: 4.97,
    reviewCount: 88,
    amenities: [{ id: '1', name: 'Pool' }],
    host: { id: 'h-4', name: 'Matteo Rossi', isSuperhost: true },
    createdAt: new Date().toISOString(),
  },
]

export function PropertiesPage() {
  const [category, setCategory] = useState<PropertyCategory | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = ALL_PROPERTIES.filter((p) => {
    const matchesCategory = category === 'all' || p.category === category
    const matchesSearch =
      searchQuery === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.country.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="properties-page container">
      <div className="page-header">
        <h1 className="page-title">Explore All Stays</h1>
        <p className="page-subtitle">Find vacation rentals, villas, cabins and more</p>
      </div>

      <PropertyFilterBar
        selectedCategory={category}
        searchQuery={searchQuery}
        onCategoryChange={setCategory}
        onSearchChange={setSearchQuery}
      />

      <div className="results-count-bar">
        <span>Showing {filtered.length} properties</span>
      </div>

      <PropertyGrid properties={filtered} />
    </div>
  )
}

