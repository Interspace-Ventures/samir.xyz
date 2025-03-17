"use client"

import * as React from "react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const [mounted, setMounted] = React.useState(false)
  const { theme, setTheme } = useTheme()

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null // Simpler loading state to avoid hydration mismatch
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="px-4 py-2 rounded bg-primary text-primary-foreground"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  )
}