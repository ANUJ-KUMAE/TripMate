export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  PROPERTIES: '/properties',
  PROPERTY_DETAIL: (id: string = ':id') => `/properties/${id}`,
  HOST_DASHBOARD: '/host',
  CREATE_PROPERTY: '/host/properties/create',
  MY_PROPERTIES: '/host/properties',
  MY_TRIPS: '/trips',
  TRIP_DETAIL: (id: string = ':id') => `/trips/${id}`,
  PROFILE: '/profile',
} as const

