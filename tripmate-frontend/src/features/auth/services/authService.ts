import { apiClient } from '@/services/api/apiClient'
import { API_ENDPOINTS } from '@/constants/apiEndpoints'
import type { ApiResponse } from '@/types/api.types'
import type { AuthResponse, User } from '../types/auth.types'
import type { LoginFormData, RegisterFormData } from '../schemas/authSchemas'

export const authService = {
  async login(payload: LoginFormData): Promise<AuthResponse> {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(API_ENDPOINTS.AUTH.LOGIN, payload)
    return response.data.data
  },

  async register(payload: RegisterFormData): Promise<AuthResponse> {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(API_ENDPOINTS.AUTH.REGISTER, payload)
    return response.data.data
  },

  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<ApiResponse<User>>(API_ENDPOINTS.AUTH.ME)
    return response.data.data
  },

  async logout(): Promise<void> {
    await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT)
  },
}

