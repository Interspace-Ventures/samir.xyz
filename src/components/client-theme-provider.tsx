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
    setMounted(true)
  }, [])

  return (
    <HydrationProvider>
      <Client>
        <div 
          className={`min-h-screen ${mounted ? 'bg-white dark:bg-gray-900' : ''}`}
          suppressHydrationWarning={suppressHydrationWarning}
          data-theme={theme}
        >
          {children}
        </div>
      </Client>
    </HydrationProvider>
  )
}