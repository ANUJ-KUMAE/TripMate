import { Link } from 'react-router-dom'
import { Compass, Home } from 'lucide-react'
import { ROUTES } from '@/constants/routes'
import { Button } from '@/components/common/Button'

export function NotFoundPage() {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <Compass size={64} className="not-found-icon text-muted" />
        <h1 className="not-found-code">404</h1>
        <h2 className="not-found-title">Page Not Found</h2>
        <p className="not-found-desc">
          We couldn't find the destination you're looking for. It might have been moved or removed.
        </p>
        <Link to={ROUTES.HOME}>
          <Button variant="primary" leftIcon={<Home size={18} />}>
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  )
}

