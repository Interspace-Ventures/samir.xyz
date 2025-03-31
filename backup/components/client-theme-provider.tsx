"use client"

import React, { useState, useEffect } from "react"
import { useTheme } from "next-themes"

interface Props {
  children: React.ReactNode
}

/**
 * Clean theme provider component for handling color scheme preferences
 */
export function ClientThemeProvider({ children }: Props) {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen transition-colors duration-300">
      {children}
    </div>
  )
}