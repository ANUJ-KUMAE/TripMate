# TripMate Frontend

A modern, scalable frontend architecture for the **TripMate** travel and property rental platform, built with **React 19**, **Vite**, **TypeScript**, **Redux Toolkit**, **React Router v7**, **Zod**, and **Axios**.

---

## 🏗️ Architecture Overview

The codebase is organized using a **Feature-Driven (Domain-Driven UI)** architecture. Business domains (Auth, Properties, Bookings, User) are isolated into self-contained feature modules, while core infrastructure (HTTP client, layouts, atomic UI components, utilities) lives in shared directories.

```
tripmate-frontend/
├── public/                      # Static public assets
├── src/
│   ├── app/                     # Application bootstrap, Redux store & React Router
│   │   ├── hooks.ts             # Typed Redux hooks: useAppDispatch & useAppSelector
│   │   ├── rootReducer.ts       # Combined reducer uniting all feature slices
│   │   ├── router.tsx           # React Router v7 routes + layout nesting + guards
│   │   └── store.ts             # Redux Toolkit store configuration
│   │
│   ├── assets/                  # Static media, SVG icons, brand assets
│   │
│   ├── components/              # Shared, reusable UI components (domain-agnostic)
│   │   ├── common/              # Atomic UI primitives (Button, Input, Card, Spinner)
│   │   ├── feedback/            # User feedback (ErrorBoundary, EmptyState, PageLoader)
│   │   └── layout/              # App Shell (Navbar, Footer, MainLayout, AuthLayout)
│   │
│   ├── config/                  # Environment & runtime configurations
│   │   └── env.ts               # Type-safe ENV variables with fallbacks
│   │
│   ├── constants/               # Application-wide static constants
│   │   ├── apiEndpoints.ts      # REST API route endpoints
│   │   ├── routes.ts            # Client-side route URLs (ROUTES.HOME, etc.)
│   │   └── storageKeys.ts       # LocalStorage key constants
│   │
│   ├── features/                # Domain-specific feature modules
│   │   ├── auth/                # Authentication & Session Management
│   │   │   ├── components/      # ProtectedRoute, RoleGuard
│   │   │   ├── schemas/         # Zod schemas: loginSchema, registerSchema
│   │   │   ├── services/        # authService (Axios calls)
│   │   │   ├── slices/          # authSlice (Redux state, token persistence)
│   │   │   ├── types/           # User, AuthState, AuthTokens
│   │   │   └── index.ts         # Feature public barrel
│   │   │
│   │   ├── properties/          # Stays, Cabins, Villas & Search
│   │   │   ├── components/      # PropertyCard, PropertyGrid, PropertyFilterBar
│   │   │   ├── schemas/         # createPropertySchema
│   │   │   ├── services/        # propertyService
│   │   │   ├── slices/          # propertySlice
│   │   │   ├── types/           # Property, PropertyFilter, PropertyCategory
│   │   │   └── index.ts
│   │   │
│   │   ├── bookings/            # Reservations & Trip Management
│   │   │   ├── components/      # BookingCard
│   │   │   ├── schemas/         # createBookingSchema
│   │   │   ├── services/        # bookingService
│   │   │   ├── slices/          # bookingSlice
│   │   │   ├── types/           # Booking, BookingStatus, CreateBookingPayload
│   │   │   └── index.ts
│   │   │
│   │   └── user/                # Profile & Preferences
│   │       ├── services/        # userService
│   │       ├── slices/          # userSlice
│   │       ├── types/           # UserProfile, UpdateProfilePayload
│   │       └── index.ts
│   │
│   ├── hooks/                   # Shared utility custom hooks
│   │   ├── useClickOutside.ts   # Click outside container handler
│   │   ├── useDebounce.ts       # Debounced values (search queries)
│   │   ├── useLocalStorage.ts   # LocalStorage synced state
│   │   └── useMediaQuery.ts     # Responsive viewport listener
│   │
│   ├── pages/                   # Thin page orchestrators matching client routes
│   │   ├── Auth/                # LoginPage, RegisterPage
│   │   ├── Bookings/            # MyTripsPage
│   │   ├── Home/                # HomePage
│   │   ├── Host/                # CreateListingPage
│   │   ├── NotFound/            # NotFoundPage (404)
│   │   ├── Profile/             # ProfilePage
│   │   └── Properties/          # PropertiesPage, PropertyDetailPage
│   │
│   ├── services/                # Core networking and external clients
│   │   └── api/
│   │       ├── apiClient.ts     # Axios instance with Bearer interceptors & auto-logout
│   │       └── apiError.ts      # Standardized ApiError class
│   │
│   ├── types/                   # Global TypeScript types & contracts
│   │   ├── api.types.ts         # ApiResponse<T>, PaginatedResponse<T>, ApiErrorResponse
│   │   └── common.types.ts      # UserRole, ID, Money, PaginationParams
│   │
│   ├── utils/                   # Pure helper functions
│   │   ├── cn.ts                # Class name concatenation utility
│   │   ├── formatters.ts        # Currency (Intl) and Date range formatters
│   │   └── storage.ts           # Safe JSON LocalStorage wrapper
│   │
│   ├── App.tsx                  # Root component (Redux Provider + RouterProvider)
│   ├── main.tsx                 # DOM Entry point
│   └── index.css                # Global design system tokens & responsive CSS
├── .env.example                 # Environment variables template
├── tsconfig.app.json            # Path alias (@/*) and modern TS compiler configuration
└── vite.config.ts               # Vite configuration with @ path alias
```

---

## ⚡ Key Highlights & Best Practices

1. **Path Aliasing**: Use `@/` to import from anywhere in `src`:
   ```ts
   import { Button } from '@/components/common'
   import { useAppSelector } from '@/app/hooks'
   import { ROUTES } from '@/constants/routes'
   import { apiClient } from '@/services/api/apiClient'
   ```

2. **State Management**:
   - Redux Toolkit slices are organized per domain feature inside `features/<name>/slices/`.
   - Typed hooks `useAppDispatch()` and `useAppSelector()` prevent type errors.
   - Authentication tokens and user metadata persist across refreshes via `utils/storage.ts`.

3. **Type-Safe Validation**:
   - All forms use **React Hook Form** with **Zod** schema validation via `@hookform/resolvers/zod`.
   - Schemas are co-located in `features/<name>/schemas/`.

4. **Security & Route Guards**:
   - `ProtectedRoute`: Guards pages requiring authentication (e.g., My Trips, Profile).
   - `RoleGuard`: Guards host/admin functionality (e.g., Create Property Listing).

5. **API & Error Handling**:
   - `apiClient` automatically attaches JWT `Bearer` tokens to outgoing requests.
   - Interceptors capture 401 Unauthenticated errors, clear local sessions, and reject with strongly-typed `ApiError`.

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Copy environment template
cp .env.example .env

# 3. Start local development server
npm run dev

# 4. Build for production & verify TypeScript checks
npm run build

# 5. Run linter
npm run lint
```
