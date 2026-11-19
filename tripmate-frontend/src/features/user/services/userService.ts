import { apiClient } from '@/services/api/apiClient'
import { API_ENDPOINTS } from '@/constants/apiEndpoints'
import type { ApiResponse } from '@/types/api.types'
import type { UpdateProfilePayload, UserProfile } from '../types/user.types'

export const userService = {
  async getProfile(): Promise<UserProfile> {
    const response = await apiClient.get<ApiResponse<UserProfile>>(API_ENDPOINTS.USERS.PROFILE)
    return response.data.data
  },

  async updateProfile(payload: UpdateProfilePayload): Promise<UserProfile> {
    const response = await apiClient.patch<ApiResponse<UserProfile>>(API_ENDPOINTS.USERS.PROFILE, payload)
    return response.data.data
  },
}

