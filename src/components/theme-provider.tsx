"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

type ThemeProviderProps = Parameters<typeof NextThemesProvider>[0]

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false)

  // Enhanced error handling and logging
  React.useEffect(() => {
    try {
      setMounted(true)
      console.log('[ThemeProvider] Successfully mounted')
    } catch (error) {
      console.error('[ThemeProvider] Error during mount:', error)
    }

    return () => {
      try {
        console.log('[ThemeProvider] Unmounting')
      } catch (error) {
        console.error('[ThemeProvider] Error during unmount:', error)
      }
    }
  }, [])

  // Show nothing until mounted to avoid hydration mismatch
  if (!mounted) {
    console.log('[ThemeProvider] Waiting for mount')
    return <div style={{ visibility: 'hidden' }}>{children}</div>
  }

  return (
    <NextThemesProvider 
      attribute="class" 
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}