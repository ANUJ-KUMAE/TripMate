import { apiClient } from '@/services/api/apiClient'
import { API_ENDPOINTS } from '@/constants/apiEndpoints'
import type { ApiResponse, PaginatedResponse } from '@/types/api.types'
import type { Property, PropertyFilter } from '../types/property.types'
import type { CreatePropertyFormData } from '../schemas/propertySchemas'

export const propertyService = {
  async getProperties(filter?: PropertyFilter): Promise<Property[]> {
    const response = await apiClient.get<ApiResponse<Property[] | PaginatedResponse<Property>>>(
      API_ENDPOINTS.PROPERTIES.BASE,
      { params: filter },
    )
    const result = response.data.data
    return Array.isArray(result) ? result : result.items
  },

  async getPropertyById(id: string): Promise<Property> {
    const response = await apiClient.get<ApiResponse<Property>>(API_ENDPOINTS.PROPERTIES.DETAIL(id))
    return response.data.data
  },

  async createProperty(payload: CreatePropertyFormData): Promise<Property> {
    const response = await apiClient.post<ApiResponse<Property>>(API_ENDPOINTS.PROPERTIES.BASE, payload)
    return response.data.data
  },

  async getHostListings(): Promise<Property[]> {
    const response = await apiClient.get<ApiResponse<Property[]>>(API_ENDPOINTS.PROPERTIES.HOST_LISTINGS)
    return response.data.data
  },
}

