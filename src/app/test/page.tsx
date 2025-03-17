"use client"

import * as React from "react"
import { useTheme } from "next-themes"

export default function TestPage() {
  const [mounted, setMounted] = React.useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  // useEffect only runs on the client
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // During SSR and initial client render, show a loading state
  if (!mounted) {
    return <div>Loading theme...</div>
  }

  return (
    <div>
      <p>Current theme: {resolvedTheme}</p>
      <button 
        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        className="px-4 py-2 mt-4 rounded bg-primary text-primary-foreground"
      >
        Switch to {resolvedTheme === "dark" ? "light" : "dark"}
      </button>
    </div>
  )
}