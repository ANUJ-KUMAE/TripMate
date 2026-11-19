export type ID = string

export const UserRole = {
  GUEST: 'guest',
  HOST: 'host',
  ADMIN: 'admin',
} as const

export type UserRole = (typeof UserRole)[keyof typeof UserRole]

export interface Money {
  amount: number
  currency: string
}

export interface PaginationParams {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

