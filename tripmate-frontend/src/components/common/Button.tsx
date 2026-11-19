import React from 'react'
import { cn } from '@/utils/cn'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled,
      leftIcon,
      rightIcon,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'btn',
          `btn-${variant}`,
          `btn-${size}`,
          isLoading && 'btn-loading',
          className,
        )}
        {...props}
      >
        {isLoading ? (
          <span className="btn-spinner" aria-hidden="true" />
        ) : (
          leftIcon && <span className="btn-icon-left">{leftIcon}</span>
        )}
        <span className="btn-text">{children}</span>
        {!isLoading && rightIcon && <span className="btn-icon-right">{rightIcon}</span>}
      </button>
    )
  },
)

Button.displayName = 'Button'

