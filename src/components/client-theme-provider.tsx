"use client"

import React, { useState, useEffect } from "react"
import { useTheme } from "next-themes"

interface Props {
  children: React.ReactNode
  suppressHydrationWarning?: boolean
}

export function ClientThemeProvider({ children, suppressHydrationWarning = false }: Props) {
  const [mounted, setMounted] = useState(false)
  
  // Enhanced compatibility for React 19
  useEffect(() => {
    // Delay mounting slightly to ensure proper hydration order
    const timer = setTimeout(() => {
      setMounted(true)
    }, 10)
    
    return () => clearTimeout(timer)
  }, [])

  // Initial render - match server exactly
  // Prevents hydration mismatch by rendering minimal content until client-side mounted
  if (!mounted) {
    return (
      <div className="min-h-screen" suppressHydrationWarning={true}>
        {children}
      </div>
    )
  }

  // Safely access theme only after mounting
  const { theme } = useTheme()

  // Simplified rendering for React 19 compatibility
  return (
    <div 
      className="min-h-screen"
      suppressHydrationWarning={suppressHydrationWarning || true}
      data-theme={theme}
    >
      {children}
    </div>
  )
}