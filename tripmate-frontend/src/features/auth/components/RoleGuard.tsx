import { Navigate, Outlet } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { useAppSelector } from '@/app/hooks'
import type { UserRole } from '@/types/common.types'

interface RoleGuardProps {
  allowedRoles: UserRole[]
  redirectTo?: string
  children?: React.ReactNode
}

export function RoleGuard({ allowedRoles, redirectTo = ROUTES.HOME, children }: RoleGuardProps) {
  const { user } = useAppSelector((state) => state.auth)

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to={redirectTo} replace />
  }

  return children ? <>{children}</> : <Outlet />
}

