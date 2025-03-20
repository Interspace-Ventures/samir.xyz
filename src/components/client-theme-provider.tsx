"use client"

import * as React from "react"
import { useTheme } from "next-themes"

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

  // On first render, don't show any background to match SSR
  if (!mounted) {
    return (
      <div className="min-h-screen" suppressHydrationWarning={suppressHydrationWarning}>
        {children}
      </div>
    )
  }

  return (
    <div 
      className="min-h-screen bg-white dark:bg-gray-900" 
      suppressHydrationWarning={suppressHydrationWarning}
      data-theme={theme}
    >
      {children}
    </div>
  )
}
