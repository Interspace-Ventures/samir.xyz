"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { HydrationProvider, Client } from "react-hydration-provider"

interface Props {
  children: React.ReactNode
  suppressHydrationWarning?: boolean
}

export function ClientThemeProvider({ children, suppressHydrationWarning = false }: Props) {
  const [mounted, setMounted] = React.useState(false)
  const { theme } = useTheme()

  React.useEffect(() => {
    try {
      setMounted(true)
      console.log('ClientThemeProvider mounted successfully', {
        theme,
        isWebview: typeof window !== 'undefined' && /wv|webview/.test(window.navigator.userAgent.toLowerCase())
      });
    } catch (error) {
      console.error('Error in ClientThemeProvider mount:', error)
    }
  }, [theme])

  // Initial render - match server exactly
  if (!mounted) {
    return (
      <div className="min-h-screen">
        {children}
      </div>
    )
  }

  return (
    <HydrationProvider>
      <Client>
        <div 
          className="min-h-screen"
          suppressHydrationWarning={true}
          data-theme={theme}
          data-mounted="true"
        >
          {children}
        </div>
      </Client>
    </HydrationProvider>
  )
}