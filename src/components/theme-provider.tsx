"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider 
      attribute="class" 
      defaultTheme="dark"
      enableSystem
      forcedTheme={process.env.NEXT_PUBLIC_FORCE_THEME || undefined}
    >
      <div className="contents">
        {children}
      </div>
    </NextThemesProvider>
  )
}