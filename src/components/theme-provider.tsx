"use client"

import React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

type ThemeProviderProps = {
  children: React.ReactNode
  attribute?: "class" | "data-theme" | "data-mode"
  defaultTheme?: string
  enableSystem?: boolean
  [prop: string]: any
}

export function ThemeProvider({ 
  children, 
  attribute = "class",
  defaultTheme = "dark",
  enableSystem = true,
  ...props 
}: ThemeProviderProps) {
  return (
    <NextThemesProvider 
      attribute={attribute as "class"}
      defaultTheme={defaultTheme}
      enableSystem={enableSystem}
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}

export default ThemeProvider