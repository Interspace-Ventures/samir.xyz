"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

type ThemeProviderProps = Parameters<typeof NextThemesProvider>[0]

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Initialize state before any other hooks
  const [mounted, setMounted] = React.useState(false)

  // Enhanced error handling and logging for hook usage
  React.useEffect(() => {
    try {
      if (!React.useState || !React.useEffect) {
        console.error('[ThemeProvider] React hooks are undefined:', {
          useState: !!React.useState,
          useEffect: !!React.useEffect
        })
        throw new Error('React hooks are not properly initialized')
      }

      setMounted(true)
      console.log('[ThemeProvider] Successfully mounted')
    } catch (error) {
      console.error('[ThemeProvider] Error during mount:', error)
      console.error('[ThemeProvider] Hook context:', {
        hookPhase: 'useEffect',
        mounted: mounted,
        hasChildren: !!children,
        reactContext: !!React.useContext,
        hookOrder: 'useState->useEffect',
        reactVersion: React.version
      })
      throw error // Re-throw to be caught by error boundary
    }

    return () => {
      try {
        console.log('[ThemeProvider] Unmounting')
      } catch (error) {
        console.error('[ThemeProvider] Error during unmount:', error)
      }
    }
  }, [])

  if (!mounted) {
    console.log('[ThemeProvider] Waiting for mount')
    // Return an empty div with aria-hidden to maintain accessibility
    return <div aria-hidden={true}>{children}</div>
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