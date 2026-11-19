import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, ArrowRight, ShieldCheck, Award, HeartHandshake } from 'lucide-react'
import { ROUTES } from '@/constants/routes'
import { PropertyFilterBar } from '@/features/properties/components/PropertyFilterBar'
import { PropertyGrid } from '@/features/properties/components/PropertyGrid'
import type { Property, PropertyCategory } from '@/features/properties/types/property.types'

const SAMPLE_FEATURED_PROPERTIES: Property[] = [
  {
    id: 'prop-1',
    title: 'Seaside Sunset Villa with Private Infinity Pool',
    description: 'Breathtaking ocean views, expansive deck, and private direct beach access.',
    category: 'beachfront',
    location: {
      city: 'Malibu',
      country: 'United States',
      address: '102 Ocean Boulevard',
    },
    pricePerNight: 450,
    currency: 'USD',
    images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'],
    maxGuests: 6,
    bedrooms: 3,
    beds: 4,
    bathrooms: 3,
    rating: 4.95,
    reviewCount: 48,
    amenities: [{ id: '1', name: 'Pool' }, { id: '2', name: 'WiFi' }, { id: '3', name: 'Ocean View' }],
    host: { id: 'host-1', name: 'Elena Rostova', isSuperhost: true },
    createdAt: new Date().toISOString(),
  },
  {
    id: 'prop-2',
    title: 'Cozy Alpine A-Frame Cabin in Pine Woods',
    description: 'Immerse in nature with wood-burning fireplace, hot tub, and alpine hiking trails.',
    category: 'cabin',
    location: {
      city: 'Aspen',
      country: 'United States',
      address: '44 Pine Ridge Road',
    },
    pricePerNight: 280,
    currency: 'USD',
    images: ['https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80'],
    maxGuests: 4,
    bedrooms: 2,
    beds: 2,
    bathrooms: 1.5,
    rating: 4.89,
    reviewCount: 32,
    amenities: [{ id: '1', name: 'Fireplace' }, { id: '2', name: 'Hot Tub' }],
    host: { id: 'host-2', name: 'Marcus Vance', isSuperhost: false },
    createdAt: new Date().toISOString(),
  },
  {
    id: 'prop-3',
    title: 'Modern Minimalist Lakefront Retreat',
    description: 'Floor-to-ceiling glass walls overlooking crystal waters with private boat dock.',
    category: 'lakefront',
    location: {
      city: 'Lake Tahoe',
      country: 'United States',
      address: '77 Emerald Bay Way',
    },
    pricePerNight: 395,
    currency: 'USD',
    images: ['https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80'],
    maxGuests: 8,
    bedrooms: 4,
    beds: 5,
    bathrooms: 3.5,
    rating: 4.98,
    reviewCount: 64,
    amenities: [{ id: '1', name: 'Waterfront' }, { id: '2', name: 'Kayak' }],
    host: { id: 'host-3', name: 'Sarah Jenkins', isSuperhost: true },
    createdAt: new Date().toISOString(),
  },
]

export function HomePage() {
  const [category, setCategory] = useState<PropertyCategory | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProperties = SAMPLE_FEATURED_PROPERTIES.filter((p) => {
    const matchesCategory = category === 'all' || p.category === category
    const matchesSearch =
      searchQuery === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.country.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles size={16} />
            <span>Find your next memorable trip</span>
          </div>
          <h1 className="hero-heading">
            Feel at home, <br /> anywhere in the world.
          </h1>
          <p className="hero-subtext">
            Explore handcrafted cabins, luxury beach villas, and serene retreats curated for your journey.
          </p>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="catalog-section">
        <div className="container">
          <PropertyFilterBar
            selectedCategory={category}
            searchQuery={searchQuery}
            onCategoryChange={setCategory}
            onSearchChange={setSearchQuery}
          />

          <div className="section-header">
            <div>
              <h2 className="section-title">Featured Stays</h2>
              <p className="section-subtitle">Handpicked properties loved by travelers</p>
            </div>
            <Link to={ROUTES.PROPERTIES} className="view-all-link">
              <span>View all stays</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <PropertyGrid properties={filteredProperties} />
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="features-banner">
        <div className="container features-grid">
          <div className="feature-item">
            <ShieldCheck size={32} className="feature-icon" />
            <h3>Verified Hosts</h3>
            <p>Every home and host is verified for quality, safety, and hospitality.</p>
          </div>
          <div className="feature-item">
            <Award size={32} className="feature-icon" />
            <h3>Best Price Guarantee</h3>
            <p>Transparent pricing with zero hidden reservation fees or surprises.</p>
          </div>
          <div className="feature-item">
            <HeartHandshake size={32} className="feature-icon" />
            <h3>24/7 Guest Care</h3>
            <p>Our dedicated support team is with you every step of your trip.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

