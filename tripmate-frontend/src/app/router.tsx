import { createBrowserRouter } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { MainLayout } from '@/components/layout/MainLayout'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute'
import { RoleGuard } from '@/features/auth/components/RoleGuard'

import {
  HomePage,
  LoginPage,
  RegisterPage,
  PropertiesPage,
  PropertyDetailPage,
  MyTripsPage,
  CreateListingPage,
  ProfilePage,
  NotFoundPage,
} from '@/pages'

export const router = createBrowserRouter([
  // Main app routes wrapped in Navbar + Footer shell
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: ROUTES.PROPERTIES,
        element: <PropertiesPage />,
      },
      {
        path: '/properties/:id',
        element: <PropertyDetailPage />,
      },
      // Authenticated User Routes
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: ROUTES.MY_TRIPS,
            element: <MyTripsPage />,
          },
          {
            path: ROUTES.PROFILE,
            element: <ProfilePage />,
          },
          // Host Only Routes
          {
            element: <RoleGuard allowedRoles={['host', 'admin']} />,
            children: [
              {
                path: ROUTES.CREATE_PROPERTY,
                element: <CreateListingPage />,
              },
            ],
          },
        ],
      },
    ],
  },
  // Auth Layout (Clean minimal view for sign-in/sign-up)
  {
    element: <AuthLayout />,
    children: [
      {
        path: ROUTES.LOGIN,
        element: <LoginPage />,
      },
      {
        path: ROUTES.REGISTER,
        element: <RegisterPage />,
      },
    ],
  },
  // 404 Catch-All
  {
    path: '*',
    element: <NotFoundPage />,
  },
])

