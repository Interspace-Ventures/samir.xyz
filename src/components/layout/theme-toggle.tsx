"use client"

import React, { useEffect, useState } from "react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  
  // Avoid hydration mismatch by only rendering once mounted on the client
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  // Enhanced button styles with proper light/dark mode support
  const buttonClasses = 
    "w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-200 focus:outline-none " +
    "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white " +
    "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"

  if (!mounted) {
    return (
      <button 
        className={buttonClasses}
        aria-label="Toggle theme"
        disabled
      >
        <span className="sr-only">Loading theme toggle</span>
        <div className="w-5 h-5 opacity-50" />
      </button>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className={buttonClasses}
      aria-label="Toggle theme"
      title={resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {resolvedTheme === "dark" ? (
        <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
          light_mode
        </span>
      ) : (
        <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
          dark_mode
        </span>
      )}
    </button>
  )
}

export default ThemeToggle