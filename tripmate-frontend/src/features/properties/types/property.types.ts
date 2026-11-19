export type PropertyCategory =
  | 'cabin'
  | 'beachfront'
  | 'villa'
  | 'apartment'
  | 'mansion'
  | 'countryside'
  | 'lakefront'

export interface PropertyLocation {
  city: string
  country: string
  address: string
  latitude?: number
  longitude?: number
}

export interface Amenity {
  id: string
  name: string
  icon?: string
}

export interface PropertyHost {
  id: string
  name: string
  avatarUrl?: string
  isSuperhost?: boolean
}

export interface Property {
  id: string
  title: string
  description: string
  category: PropertyCategory
  location: PropertyLocation
  pricePerNight: number
  currency: string
  images: string[]
  maxGuests: number
  bedrooms: number
  beds: number
  bathrooms: number
  rating: number
  reviewCount: number
  amenities: Amenity[]
  host: PropertyHost
  createdAt: string
}

export interface PropertyFilter {
  searchQuery?: string
  category?: PropertyCategory | 'all'
  minPrice?: number
  maxPrice?: number
  guests?: number
}

export interface PropertyState {
  items: Property[]
  selectedProperty: Property | null
  filters: PropertyFilter
  isLoading: boolean
  error: string | null
}

