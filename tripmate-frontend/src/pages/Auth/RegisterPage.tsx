import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, User, Eye, EyeOff, AlertCircle } from 'lucide-react'
import { ROUTES } from '@/constants/routes'
import { useAppDispatch } from '@/app/hooks'
import { authSuccess } from '@/features/auth/slices/authSlice'
import { registerSchema, type RegisterFormData } from '@/features/auth/schemas/authSchemas'
import { TripMateLogo } from '@/components/common/TripMateLogo'
import { GoogleIcon, AppleIcon } from '@/components/common/SocialIcons'

export function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeTerms: false,
    },
  })

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setErrorMsg(null)
      dispatch(
        authSuccess({
          user: {
            id: 'user-demo-new',
            email: data.email,
            fullName: data.fullName,
            role: 'guest',
            isEmailVerified: true,
            createdAt: new Date().toISOString(),
          },
          tokens: {
            accessToken: 'demo_jwt_access_token',
            refreshToken: 'demo_jwt_refresh_token',
          },
        }),
      )
      navigate(ROUTES.HOME, { replace: true })
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Registration failed'
      setErrorMsg(msg)
    }
  }

  return (
    <div className="auth-card-inner">
      {/* Brand Header */}
      <div className="auth-card-top-logo">
        <TripMateLogo size="md" />
      </div>

      {/* Title & Greeting */}
      <div className="auth-header-text">
        <h2 className="auth-card-title with-brush">
          <span>Create </span>
          <span className="title-brush-wrap">
            Your Account
            <svg
              viewBox="0 0 140 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="heading-brush-svg"
              aria-hidden="true"
            >
              <path
                d="M3 8C35 3 95 3 137 7.5"
                stroke="#7c3aed"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h2>
        <p className="auth-card-subtitle">Join TripMate AI and start your travel journey today</p>
      </div>

      {errorMsg && (
        <div className="auth-error-banner" role="alert">
          <AlertCircle size={16} />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="auth-form-body" noValidate>
        {/* Full Name */}
        <div className="auth-field-group">
          <label htmlFor="register-name" className="auth-field-label">
            Full Name
          </label>
          <div className={`auth-input-container ${errors.fullName ? 'has-error' : ''}`}>
            <span className="auth-input-icon">
              <User size={18} />
            </span>
            <input
              id="register-name"
              type="text"
              placeholder="Enter your full name"
              className="auth-input-control"
              {...register('fullName')}
            />
          </div>
          {errors.fullName && <span className="auth-field-error">{errors.fullName.message}</span>}
        </div>

        {/* Email Address */}
        <div className="auth-field-group">
          <label htmlFor="register-email" className="auth-field-label">
            Email Address
          </label>
          <div className={`auth-input-container ${errors.email ? 'has-error' : ''}`}>
            <span className="auth-input-icon">
              <Mail size={18} />
            </span>
            <input
              id="register-email"
              type="email"
              placeholder="Enter your email address"
              className="auth-input-control"
              {...register('email')}
            />
          </div>
          {errors.email && <span className="auth-field-error">{errors.email.message}</span>}
        </div>

        {/* Password */}
        <div className="auth-field-group">
          <label htmlFor="register-password" className="auth-field-label">
            Password
          </label>
          <div className={`auth-input-container ${errors.password ? 'has-error' : ''}`}>
            <span className="auth-input-icon">
              <Lock size={18} />
            </span>
            <input
              id="register-password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a password"
              className="auth-input-control"
              {...register('password')}
            />
            <button
              type="button"
              className="password-toggle-btn"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && <span className="auth-field-error">{errors.password.message}</span>}
        </div>

        {/* Confirm Password */}
        <div className="auth-field-group">
          <label htmlFor="register-confirm-password" className="auth-field-label">
            Confirm Password
          </label>
          <div className={`auth-input-container ${errors.confirmPassword ? 'has-error' : ''}`}>
            <span className="auth-input-icon">
              <Lock size={18} />
            </span>
            <input
              id="register-confirm-password"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm your password"
              className="auth-input-control"
              {...register('confirmPassword')}
            />
            <button
              type="button"
              className="password-toggle-btn"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <span className="auth-field-error">{errors.confirmPassword.message}</span>
          )}
        </div>

        {/* Terms of Service & Privacy Policy Checkbox */}
        <div className="auth-terms-row">
          <label className="auth-checkbox-label">
            <input
              type="checkbox"
              className="auth-checkbox"
              {...register('agreeTerms')}
            />
            <span className="auth-terms-text">
              I agree to the{' '}
              <a href="#terms" className="auth-inline-link">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#privacy" className="auth-inline-link">
                Privacy Policy
              </a>
            </span>
          </label>
          {errors.agreeTerms && (
            <span className="auth-field-error block">{errors.agreeTerms.message}</span>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="auth-btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating account...' : 'Sign Up'}
        </button>
      </form>

      {/* Divider */}
      <div className="auth-divider">
        <span className="auth-divider-line" />
        <span className="auth-divider-text">Or sign up with</span>
        <span className="auth-divider-line" />
      </div>

      {/* Social Logins */}
      <div className="auth-social-buttons">
        <button type="button" className="auth-social-btn" onClick={() => {}}>
          <GoogleIcon size={18} />
          <span>Continue with Google</span>
        </button>

        <button type="button" className="auth-social-btn" onClick={() => {}}>
          <AppleIcon size={18} />
          <span>Continue with Apple</span>
        </button>
      </div>

      {/* Bottom Switch Link */}
      <div className="auth-bottom-switch">
        <span>Already have an account?</span>{' '}
        <Link to={ROUTES.LOGIN} className="auth-switch-link">
          Log In
        </Link>
      </div>
    </div>
  )
}
