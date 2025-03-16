"use client"

import * as React from "react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  if (!theme) {
    return null
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="px-4 py-2 rounded bg-primary text-primary-foreground"
    >
      {theme === "dark" ? "Light" : "Dark"} Mode
    </button>
  )
}