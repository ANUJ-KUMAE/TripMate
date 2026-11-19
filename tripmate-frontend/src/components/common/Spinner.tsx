import { cn } from '@/utils/cn'

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Spinner({ size = 'md', className }: SpinnerProps) {
  return (
    <div
      className={cn('spinner', `spinner-${size}`, className)}
      role="status"
      aria-label="Loading"
    />
  )
}

