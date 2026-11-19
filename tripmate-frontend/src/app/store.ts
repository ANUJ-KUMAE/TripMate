import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './rootReducer'

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore date strings or common non-serializable edge cases if needed
        ignoredActionPaths: ['payload.timestamp'],
      },
    }),
  devTools: import.meta.env.DEV,
})

export type AppDispatch = typeof store.dispatch

