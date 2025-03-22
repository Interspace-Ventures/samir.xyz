"use client"

import * as React from "react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const [mounted, setMounted] = React.useState(false)
  const [darkIntensity, setDarkIntensity] = React.useState(1)
  const { setTheme } = useTheme()

  // Only show the toggle after mounting to prevent hydration mismatch
  React.useEffect(() => {
    setMounted(true)
    // Always set to dark theme as we're using only dark mode
    setTheme("dark")
  }, [setTheme])

  // Return a placeholder with the same dimensions during SSR
  if (!mounted) {
    return (
      <div className="w-6 h-6 flex items-center justify-center">
        <div className="animate-pulse bg-gray-700 h-4 w-4 rounded-full" />
      </div>
    )
  }

  // Function to toggle between different dark theme intensities
  const toggleDarkIntensity = () => {
    setDarkIntensity(darkIntensity === 1 ? 2 : 1)
    // In a real implementation, we'd also update CSS variables to reflect darker/lighter dark mode
  }

  return (
    <button
      onClick={toggleDarkIntensity}
      className="relative w-6 h-6 flex items-center justify-center"
      aria-label="Toggle dark theme intensity"
    >
      {/* Stars icon for dark mode toggling */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        className={`h-[1.2rem] w-[1.2rem] transition-opacity ${darkIntensity === 1 ? 'text-purple-400' : 'text-gray-400'}`}
        aria-hidden="true"
      >
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      </svg>
    </button>
  )
}

export default ThemeToggle