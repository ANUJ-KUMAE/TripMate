import type { UserRole } from '@/types/common.types'

export interface User {
  id: string
  email: string
  fullName: string
  role: UserRole
  avatarUrl?: string
  isEmailVerified: boolean
  createdAt: string
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
}

export interface AuthResponse {
  user: User
  tokens: AuthTokens
}

export interface AuthState {
  user: User | null
  accessToken: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

