import { Link } from 'react-router-dom'
import { Compass, Heart } from 'lucide-react'
import { ROUTES } from '@/constants/routes'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand-section">
            <div className="footer-brand">
              <Compass className="brand-icon" size={24} />
              <span className="brand-name">TripMate</span>
            </div>
            <p className="footer-tagline">
              Discover unique stays, vacation rentals, cabins, and beach villas around the globe.
            </p>
          </div>

          <div className="footer-links-group">
            <h4>Explore</h4>
            <ul>
              <li><Link to={ROUTES.PROPERTIES}>All Stays</Link></li>
              <li><Link to={ROUTES.HOME}>Destinations</Link></li>
              <li><Link to={ROUTES.CREATE_PROPERTY}>Become a Host</Link></li>
            </ul>
          </div>

          <div className="footer-links-group">
            <h4>Support</h4>
            <ul>
              <li><a href="#help">Help Center</a></li>
              <li><a href="#safety">Safety Information</a></li>
              <li><a href="#cancellation">Cancellation Options</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            &copy; {currentYear} TripMate Inc. Built with{' '}
            <Heart size={14} className="heart-icon" fill="currentColor" /> for travelers worldwide.
          </p>
        </div>
      </div>
    </footer>
  )
}

