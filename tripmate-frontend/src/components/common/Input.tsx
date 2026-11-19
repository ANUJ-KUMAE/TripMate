import React from 'react'
import { cn } from '@/utils/cn'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, leftIcon, rightIcon, id, ...props }, ref) => {
    const inputId = id || props.name

    return (
      <div className="input-group">
        {label && (
          <label htmlFor={inputId} className="input-label">
            {label}
          </label>
        )}
        <div className={cn('input-wrapper', error && 'input-has-error')}>
          {leftIcon && <span className="input-icon-left">{leftIcon}</span>}
          <input
            ref={ref}
            id={inputId}
            className={cn('input-field', className)}
            aria-invalid={Boolean(error)}
            {...props}
          />
          {rightIcon && <span className="input-icon-right">{rightIcon}</span>}
        </div>
        {error ? (
          <span className="input-error" role="alert">
            {error}
          </span>
        ) : helperText ? (
          <span className="input-helper">{helperText}</span>
        ) : null}
      </div>
    )
  },
)

Input.displayName = 'Input'

