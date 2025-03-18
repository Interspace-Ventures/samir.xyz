"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes/dist/types"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    console.log('ThemeProvider initializing...')
    try {
      if (typeof window !== 'undefined') {
        // Log environment information for debugging
        console.log('Environment check:', {
          darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
          reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
          userAgent: window.navigator.userAgent,
          colorScheme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
          storageAvailable: (() => {
            try {
              localStorage.setItem('test', 'test')
              localStorage.removeItem('test')
              return true
            } catch (e) {
              return false
            }
          })()
        })
      }
      setMounted(true)
    } catch (error) {
      console.error('ThemeProvider initialization error:', error)
    }
  }, [])

  // Return null on server and during initial mount to prevent hydration mismatch
  if (!mounted) {
    return null
  }

  return (
    <NextThemesProvider 
      attribute="class" 
      defaultTheme="dark"
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}