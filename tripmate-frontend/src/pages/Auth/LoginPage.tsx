import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react'
import { ROUTES } from '@/constants/routes'
import { useAppDispatch } from '@/app/hooks'
import { authSuccess } from '@/features/auth/slices/authSlice'
import { loginSchema, type LoginFormData } from '@/features/auth/schemas/authSchemas'
import { TripMateLogo } from '@/components/common/TripMateLogo'
import { GoogleIcon, AppleIcon } from '@/components/common/SocialIcons'

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const from = (location.state as { from?: { pathname?: string } })?.from?.pathname || ROUTES.HOME

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      setErrorMsg(null)
      dispatch(
        authSuccess({
          user: {
            id: 'user-demo-1',
            email: data.email,
            fullName: data.email.split('@')[0],
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
      navigate(from, { replace: true })
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Invalid email or password'
      setErrorMsg(msg)
    }
  }

  return (
    <div className="auth-card-inner">
      {/* Brand Header */}
      <div className="auth-card-top-logo">
        <TripMateLogo showTagline size="md" />
      </div>

      {/* Title & Greeting */}
      <div className="auth-header-text">
        <h2 className="auth-card-title">Welcome Back 👋</h2>
        <p className="auth-card-subtitle">Login to your TripMate AI account</p>
      </div>

      {errorMsg && (
        <div className="auth-error-banner" role="alert">
          <AlertCircle size={16} />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="auth-form-body" noValidate>
        {/* Email Address */}
        <div className="auth-field-group">
          <label htmlFor="login-email" className="auth-field-label">
            Email Address
          </label>
          <div className={`auth-input-container ${errors.email ? 'has-error' : ''}`}>
            <span className="auth-input-icon">
              <Mail size={18} />
            </span>
            <input
              id="login-email"
              type="email"
              placeholder="Enter your email"
              className="auth-input-control"
              {...register('email')}
            />
          </div>
          {errors.email && <span className="auth-field-error">{errors.email.message}</span>}
        </div>

        {/* Password */}
        <div className="auth-field-group">
          <label htmlFor="login-password" className="auth-field-label">
            Password
          </label>
          <div className={`auth-input-container ${errors.password ? 'has-error' : ''}`}>
            <span className="auth-input-icon">
              <Lock size={18} />
            </span>
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
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

        {/* Remember me & Forgot Password */}
        <div className="auth-remember-row">
          <label className="auth-checkbox-label">
            <input
              type="checkbox"
              className="auth-checkbox"
              {...register('rememberMe')}
            />
            <span>Remember me</span>
          </label>
          <a href="#forgot" className="auth-forgot-link">
            Forgot password?
          </a>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="auth-btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Signing in...' : 'Login'}
        </button>
      </form>

      {/* Divider */}
      <div className="auth-divider">
        <span className="auth-divider-line" />
        <span className="auth-divider-text">Or continue with</span>
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
        <span>Don't have an account?</span>{' '}
        <Link to={ROUTES.REGISTER} className="auth-switch-link">
          Sign Up
        </Link>
      </div>
    </div>
  )
}
