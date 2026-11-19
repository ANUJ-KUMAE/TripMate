import React, { useEffect, useState } from 'react'
import { STORAGE_KEYS } from '@/constants/storageKeys'
import { storage } from '@/utils/storage'
import { ThemeContext, type Theme } from './ThemeContext'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    const savedTheme = storage.get<Theme>(STORAGE_KEYS.THEME)
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme
    }
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
    return 'light'
  })

  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('data-theme', theme)
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    storage.set(STORAGE_KEYS.THEME, theme)
  }, [theme])

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, isDark: theme === 'dark' }}>
      {children}
    </ThemeContext.Provider>
  )
}

