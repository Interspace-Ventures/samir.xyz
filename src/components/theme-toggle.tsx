"use client"

import * as React from "react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const [mounted, setMounted] = React.useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  // useEffect only runs on the client, so we can safely show the UI
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // During SSR and initial client render, show a placeholder
  if (!mounted) {
    return (
      <button 
        className="px-4 py-2 rounded bg-primary text-primary-foreground"
        aria-label="Loading theme toggle"
        disabled
      >
        Loading...
      </button>
    )
  }

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="px-4 py-2 rounded bg-primary text-primary-foreground"
      aria-label="Toggle theme"
    >
      {resolvedTheme === "dark" ? "Light" : "Dark"}
    </button>
  )
}