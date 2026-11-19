/**
 * Environment configuration with type-safety and fallback defaults.
 */
export const ENV = {
  APP_NAME: import.meta.env.VITE_APP_NAME || 'TripMate',
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  IS_DEV: import.meta.env.DEV,
  IS_PROD: import.meta.env.PROD,
} as const

