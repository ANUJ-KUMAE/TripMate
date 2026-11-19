import { Search, SlidersHorizontal } from 'lucide-react'
import type { PropertyCategory } from '../types/property.types'

const CATEGORIES: Array<{ id: PropertyCategory | 'all'; label: string }> = [
  { id: 'all', label: 'All Stays' },
  { id: 'beachfront', label: 'Beachfront' },
  { id: 'cabin', label: 'Cabins' },
  { id: 'villa', label: 'Villas' },
  { id: 'mansion', label: 'Mansions' },
  { id: 'countryside', label: 'Countryside' },
  { id: 'lakefront', label: 'Lakefront' },
]

interface PropertyFilterBarProps {
  selectedCategory: string
  searchQuery: string
  onCategoryChange: (category: PropertyCategory | 'all') => void
  onSearchChange: (query: string) => void
}

export function PropertyFilterBar({
  selectedCategory,
  searchQuery,
  onCategoryChange,
  onSearchChange,
}: PropertyFilterBarProps) {
  return (
    <div className="filter-bar">
      <div className="filter-search-box">
        <Search size={18} className="search-icon" />
        <input
          type="text"
          placeholder="Search by city, country or stay name..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
        <button type="button" className="filter-options-btn" aria-label="Filters">
          <SlidersHorizontal size={16} />
          <span>Filters</span>
        </button>
      </div>

      <div className="category-scroll-container">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            className={`category-pill ${selectedCategory === cat.id ? 'active' : ''}`}
            onClick={() => onCategoryChange(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  )
}

