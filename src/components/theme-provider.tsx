"use client"

import React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

type ThemeProviderProps = {
  children: React.ReactNode
  [prop: string]: any
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider 
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      forcedTheme="dark" // Force dark theme always
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}

export default ThemeProvider