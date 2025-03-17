"use client"

import * as React from "react"
import { useTheme } from "next-themes"

export default function TestPage() {
  const [mounted, setMounted] = React.useState(false)
  const { theme } = useTheme()

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Until mounted, show a simple loading state
  if (!mounted) {
    return <div>Loading theme...</div>
  }

  return (
    <div>
      <p>Theme is: {theme}</p>
    </div>
  )
}