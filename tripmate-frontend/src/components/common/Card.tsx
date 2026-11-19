import React from 'react'
import { cn } from '@/utils/cn'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'elevated' | 'outlined' | 'flat'
}

export function Card({ className, variant = 'elevated', children, ...props }: CardProps) {
  return (
    <div className={cn('card', `card-${variant}`, className)} {...props}>
      {children}
    </div>
  )
}

