"use client"

import * as React from "react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const [mounted, setMounted] = React.useState(false)
  const { theme, setTheme } = useTheme()

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // During SSR and hydration, return a static button
  if (!mounted) {
    return (
      <button
        className="px-4 py-2 rounded bg-primary text-primary-foreground"
        aria-label="Theme toggle"
      >
        Theme
      </button>
    )
  }

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="px-4 py-2 rounded bg-primary text-primary-foreground"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
    >
      {theme === "light" ? "Dark" : "Light"}
    </button>
  )
}