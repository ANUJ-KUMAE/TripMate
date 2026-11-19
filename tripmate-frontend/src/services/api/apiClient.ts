import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios'
import { ENV } from '@/config/env'
import { STORAGE_KEYS } from '@/constants/storageKeys'
import { storage } from '@/utils/storage'
import { ApiError } from './apiError'
import type { ApiErrorResponse } from '@/types/api.types'

export const apiClient = axios.create({
  baseURL: ENV.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
})

// Request interceptor: attach bearer token if available
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = storage.get<string>(STORAGE_KEYS.ACCESS_TOKEN)
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: unknown) => Promise.reject(error),
)

// Response interceptor: standardize error format
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    if (error.response) {
      const data = error.response.data
      const message = data?.message || error.message || 'An unexpected error occurred'
      const status = error.response.status

      if (status === 401) {
        // Token expired or invalid: clear session
        storage.remove(STORAGE_KEYS.ACCESS_TOKEN)
        storage.remove(STORAGE_KEYS.REFRESH_TOKEN)
        storage.remove(STORAGE_KEYS.USER_DATA)
      }

      return Promise.reject(new ApiError(message, status, data?.errors))
    }

    if (error.request) {
      return Promise.reject(new ApiError('Network error: Unable to connect to server', 0))
    }

    return Promise.reject(new ApiError(error.message || 'Request setup error', 500))
  },
)

