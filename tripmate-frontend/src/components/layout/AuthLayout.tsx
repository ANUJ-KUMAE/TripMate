import { Outlet, useLocation } from 'react-router-dom'
import { AuthHeroPane } from '@/features/auth/components/AuthHeroPane'
import { ThemeToggle } from '@/components/common/ThemeToggle'

export function AuthLayout() {
  const location = useLocation()
  const isSignUp = location.pathname.includes('/register')
  const mode = isSignUp ? 'signup' : 'login'

  return (
    <div className={`auth-fullscreen-page auth-page-${mode}`}>
      {/* Full-Page Panoramic Scenic Background (100vw x 100vh) */}
      <div className={`auth-fullscreen-backdrop backdrop-${mode}`} />
      <div className="auth-fullscreen-overlay" />

      {/* Floating Theme Toggle in Auth View */}
      <div className="auth-theme-toggle-wrapper">
        <ThemeToggle className="auth-theme-toggle" />
      </div>

      {/* Main Full-Width Content Container */}
      <div className="auth-fullscreen-content">
        {/* Left Side: Hero Typography, Badges & Decor */}
        <div className="auth-hero-column">
          <AuthHeroPane mode={mode} />
        </div>

        {/* Right Side: Floating White Form Card */}
        <div className="auth-card-column">
          <div className="auth-form-card">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
