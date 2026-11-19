import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Compass, User, LogOut, PlusCircle, Menu, X, Briefcase } from 'lucide-react'
import { ROUTES } from '@/constants/routes'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { logout } from '@/features/auth/slices/authSlice'
import { ThemeToggle } from '@/components/common/ThemeToggle'

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { isAuthenticated, user } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate(ROUTES.HOME)
  }

  const isHost = user?.role === 'host' || user?.role === 'admin'

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Brand Logo */}
        <Link to={ROUTES.HOME} className="navbar-brand">
          <Compass className="brand-icon" size={28} />
          <span className="brand-name">TripMate</span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="navbar-nav desktop-only">
          <Link to={ROUTES.PROPERTIES} className="nav-link">
            Explore Stays
          </Link>
          {isAuthenticated && (
            <Link to={ROUTES.MY_TRIPS} className="nav-link">
              My Trips
            </Link>
          )}
          {isHost && (
            <Link to={ROUTES.CREATE_PROPERTY} className="nav-link host-link">
              <PlusCircle size={16} />
              <span>List a Stay</span>
            </Link>
          )}
        </nav>

        {/* User Auth Section */}
        <div className="navbar-actions desktop-only">
          <ThemeToggle />
          {isAuthenticated && user ? (
            <div className="user-menu">
              <Link to={ROUTES.PROFILE} className="user-profile-badge">
                <User size={18} />
                <span className="user-name">{user.fullName}</span>
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="btn-icon"
                title="Log out"
                aria-label="Log out"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to={ROUTES.LOGIN} className="btn btn-ghost btn-sm">
                Log in
              </Link>
              <Link to={ROUTES.REGISTER} className="btn btn-primary btn-sm">
                Sign up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="mobile-toggle mobile-only"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-menu mobile-only">
          <div className="mobile-theme-row">
            <ThemeToggle showLabel className="mobile-nav-link" />
          </div>

          <Link
            to={ROUTES.PROPERTIES}
            className="mobile-nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Compass size={18} />
            <span>Explore Stays</span>
          </Link>

          {isAuthenticated && (
            <>
              <Link
                to={ROUTES.MY_TRIPS}
                className="mobile-nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Briefcase size={18} />
                <span>My Trips</span>
              </Link>
              {isHost && (
                <Link
                  to={ROUTES.CREATE_PROPERTY}
                  className="mobile-nav-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <PlusCircle size={18} />
                  <span>List a Stay</span>
                </Link>
              )}
              <Link
                to={ROUTES.PROFILE}
                className="mobile-nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User size={18} />
                <span>Profile</span>
              </Link>
              <button
                type="button"
                className="mobile-nav-link text-danger"
                onClick={() => {
                  setMobileMenuOpen(false)
                  handleLogout()
                }}
              >
                <LogOut size={18} />
                <span>Log out</span>
              </button>
            </>
          )}

          {!isAuthenticated && (
            <div className="mobile-auth-actions">
              <Link
                to={ROUTES.LOGIN}
                className="btn btn-secondary w-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                Log in
              </Link>
              <Link
                to={ROUTES.REGISTER}
                className="btn btn-primary w-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  )
}

