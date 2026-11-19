export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
    REFRESH: '/auth/refresh',
  },
  PROPERTIES: {
    BASE: '/properties',
    SEARCH: '/properties/search',
    DETAIL: (id: string) => `/properties/${id}`,
    HOST_LISTINGS: '/properties/host/my-listings',
  },
  BOOKINGS: {
    BASE: '/bookings',
    MY_BOOKINGS: '/bookings/me',
    DETAIL: (id: string) => `/bookings/${id}`,
    CANCEL: (id: string) => `/bookings/${id}/cancel`,
  },
  USERS: {
    PROFILE: '/users/profile',
  },
} as const

