import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'

interface ThemeToggleProps {
  className?: string
  showLabel?: boolean
}

export function ThemeToggle({ className = '', showLabel = false }: ThemeToggleProps) {
  const { toggleTheme, isDark } = useTheme()

  return (
    <button
      type="button"
      className={`theme-toggle-btn ${className}`}
      onClick={toggleTheme}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <span className="theme-toggle-icon">
        {isDark ? <Sun size={18} className="sun-icon" /> : <Moon size={18} className="moon-icon" />}
      </span>
      {showLabel && (
        <span className="theme-toggle-label">
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </span>
      )}
    </button>
  )
}
