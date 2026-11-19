import { Bed, Utensils, Sparkles, Calendar, Plane } from 'lucide-react'
import { TripMateLogo } from '@/components/common/TripMateLogo'

interface AuthHeroPaneProps {
  mode: 'login' | 'signup'
}

export function AuthHeroPane({ mode }: AuthHeroPaneProps) {
  const isLogin = mode === 'login'

  return (
    <div className={`auth-hero-content auth-hero-${mode}`}>
      {/* Top Header Decor */}
      {isLogin ? (
        <div className="flight-path-container">
          <svg
            className="flight-path-svg"
            viewBox="0 0 160 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M10 40C45 38 85 28 135 15"
              stroke="rgba(255, 255, 255, 0.85)"
              strokeWidth="2.5"
              strokeDasharray="4 5"
              strokeLinecap="round"
            />
          </svg>
          <div className="flight-plane-wrapper">
            <Plane size={24} className="flight-plane-icon" />
          </div>
        </div>
      ) : (
        <div className="signup-hero-top">
          <TripMateLogo variant="white" size="md" />
          <div className="glass-pill-badge">
            <span>AI-Powered Travel & Dining Platform</span>
          </div>
        </div>
      )}

      {/* Main Headline */}
      <div className="auth-hero-headline-block">
        <h1 className="auth-hero-title">
          Plan Smarter.
          <br />
          <span className="title-highlight-wrap">
            Travel Better.
            <svg
              viewBox="0 0 160 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="curved-underline-svg"
              aria-hidden="true"
            >
              <path
                d="M4 10C35 4 110 3 156 9"
                stroke="#8b5cf6"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h1>

        <p className="auth-hero-subtitle">
          {isLogin
            ? 'AI-powered travel platform to discover, book and enjoy hotels, restaurants, and personalized trips.'
            : 'Discover, plan, book and experience amazing hotels and restaurants with the power of AI.'}
        </p>
      </div>

      {/* Feature Badges List */}
      <div className="auth-features-list">
        {/* Feature 1 */}
        <div className="auth-feature-card">
          <div className="feature-icon-box">
            {isLogin ? <Calendar size={22} /> : <Sparkles size={22} />}
          </div>
          <div className="feature-info">
            <h4 className="feature-name">AI Trip Planner</h4>
            <p className="feature-desc">Get personalized itineraries</p>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="auth-feature-card">
          <div className="feature-icon-box">
            <Bed size={22} />
          </div>
          <div className="feature-info">
            <h4 className="feature-name">Book Hotels</h4>
            <p className="feature-desc">
              {isLogin ? 'Find and book the best stays' : 'Find the perfect stay'}
            </p>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="auth-feature-card">
          <div className="feature-icon-box">
            <Utensils size={22} />
          </div>
          <div className="feature-info">
            <h4 className="feature-name">Reserve Restaurants</h4>
            <p className="feature-desc">Discover and book great dining</p>
          </div>
        </div>
      </div>
    </div>
  )
}
