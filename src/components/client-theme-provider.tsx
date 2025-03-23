"use client"

import React, { useState, useEffect } from "react"
import { useTheme } from "next-themes"

interface Props {
  children: React.ReactNode
  suppressHydrationWarning?: boolean
}

export function ClientThemeProvider({ children, suppressHydrationWarning = false }: Props) {
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()

  // Simple effect for React 19 compatibility
  useEffect(() => {
    setMounted(true)
  }, [])

  // Initial render - match server exactly
  if (!mounted) {
    return (
      <div className="min-h-screen">
        {children}
      </div>
    )
  }

  // Simplified rendering for React 19 compatibility
  return (
    <div 
      className="min-h-screen"
      suppressHydrationWarning={suppressHydrationWarning}
      data-theme={theme}
    >
      {children}
    </div>
  )
}