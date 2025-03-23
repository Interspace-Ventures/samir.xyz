"use client"

import React, { useState, useEffect } from "react"
import { useTheme } from "next-themes"

interface Props {
  children: React.ReactNode
  suppressHydrationWarning?: boolean
}

// Simplified version to avoid React 19 hydration issues
export function ClientThemeProvider({ children, suppressHydrationWarning = false }: Props) {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div 
      className="min-h-screen" 
      suppressHydrationWarning={true}
    >
      {children}
    </div>
  )
}