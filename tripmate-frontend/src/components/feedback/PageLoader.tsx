import { Spinner } from '@/components/common/Spinner'

interface PageLoaderProps {
  message?: string
}

export function PageLoader({ message = 'Loading TripMate...' }: PageLoaderProps) {
  return (
    <div className="page-loader-container">
      <Spinner size="lg" />
      <p className="page-loader-message">{message}</p>
    </div>
  )
}

