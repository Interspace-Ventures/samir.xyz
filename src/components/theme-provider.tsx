"use client"

import React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

type ThemeProviderProps = {
  children: React.ReactNode
  [prop: string]: any
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Simplified version with fewer props to avoid hydration issues
  return (
    <NextThemesProvider 
      attribute="class"
      defaultTheme="dark"
      forcedTheme="dark"
    >
      {children}
    </NextThemesProvider>
  )
}

export default ThemeProvider