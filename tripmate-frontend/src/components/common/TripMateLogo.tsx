interface TripMateLogoProps {
  variant?: 'default' | 'white'
  size?: 'sm' | 'md' | 'lg'
  showTagline?: boolean
  className?: string
}

export function TripMateLogo({
  variant = 'default',
  size = 'md',
  showTagline = false,
  className = '',
}: TripMateLogoProps) {
  const isWhite = variant === 'white'

  // Dimensions
  const iconSizes = {
    sm: { width: 32, height: 24 },
    md: { width: 44, height: 32 },
    lg: { width: 56, height: 40 },
  }

  const textSizes = {
    sm: '1.15rem',
    md: '1.45rem',
    lg: '1.85rem',
  }

  const { width, height } = iconSizes[size]

  return (
    <div className={`tripmate-logo-container ${className}`}>
      <div className="tripmate-logo-row">
        {/* Mountain + Waves SVG Graphic */}
        <svg
          width={width}
          height={height}
          viewBox="0 0 64 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="tripmate-logo-mark"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="mtnGradLeft" x1="16" y1="6" x2="32" y2="28" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#4f46e5" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
            <linearGradient id="mtnGradRight" x1="48" y1="6" x2="32" y2="28" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#7c3aed" />
              <stop offset="100%" stopColor="#9333ea" />
            </linearGradient>
            <linearGradient id="waveGrad1" x1="8" y1="34" x2="56" y2="34" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
            <linearGradient id="waveGrad2" x1="12" y1="42" x2="52" y2="42" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>

          {/* Left Mountain Facet */}
          <path
            d="M32 6L14 30H32V6Z"
            fill="url(#mtnGradLeft)"
          />

          {/* Right Mountain Facet */}
          <path
            d="M32 6L50 30H32V6Z"
            fill="url(#mtnGradRight)"
          />

          {/* Inner Mountain Highlight / Shading */}
          <path
            d="M32 12L24 28H32V12Z"
            fill="white"
            fillOpacity="0.25"
          />

          {/* Upper Fluid Wave */}
          <path
            d="M8 34C16 31 24 37 32 34C40 31 48 37 56 34"
            stroke="url(#waveGrad1)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Lower Fluid Wave */}
          <path
            d="M12 42C19 39 26 44 33 42C40 40 46 44 52 42"
            stroke="url(#waveGrad2)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>

        {/* Brand Text */}
        <div className="tripmate-logo-text" style={{ fontSize: textSizes[size] }}>
          <span className={`brand-title-main ${isWhite ? 'text-white' : 'text-navy'}`}>
            TripMate
          </span>
          <span className="brand-title-ai">AI</span>
        </div>
      </div>

      {showTagline && (
        <span className={`tripmate-logo-tagline ${isWhite ? 'text-white-sub' : 'text-gray-sub'}`}>
          TRAVEL • STAY • DINE • PLAN WITH AI
        </span>
      )}
    </div>
  )
}

