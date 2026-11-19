import type { User } from '@/features/auth/types/auth.types'

export interface UserProfile extends User {
  phoneNumber?: string
  bio?: string
  address?: string
}

export interface UpdateProfilePayload {
  fullName?: string
  phoneNumber?: string
  bio?: string
  address?: string
  avatarUrl?: string
}

export interface UserState {
  profile: UserProfile | null
  isLoading: boolean
  error: string | null
}

