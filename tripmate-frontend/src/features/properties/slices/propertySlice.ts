import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Property, PropertyFilter, PropertyState } from '../types/property.types'

const initialState: PropertyState = {
  items: [],
  selectedProperty: null,
  filters: {
    category: 'all',
  },
  isLoading: false,
  error: null,
}

export const propertySlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload
    },
    setProperties(state, action: PayloadAction<Property[]>) {
      state.items = action.payload
      state.isLoading = false
      state.error = null
    },
    setSelectedProperty(state, action: PayloadAction<Property | null>) {
      state.selectedProperty = action.payload
    },
    setFilters(state, action: PayloadAction<Partial<PropertyFilter>>) {
      state.filters = { ...state.filters, ...action.payload }
    },
    resetFilters(state) {
      state.filters = { category: 'all' }
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload
      state.isLoading = false
    },
  },
})

export const {
  setLoading,
  setProperties,
  setSelectedProperty,
  setFilters,
  resetFilters,
  setError,
} = propertySlice.actions

export default propertySlice.reducer

