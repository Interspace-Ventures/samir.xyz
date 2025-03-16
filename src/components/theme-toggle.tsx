"use client"

import * as React from "react"
import { useTheme } from "next-themes"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

// SVG icons as components
const SunIcon = React.forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    ref={ref}
    {...props}
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </svg>
))

SunIcon.displayName = 'SunIcon'

const MoonIcon = React.forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    ref={ref}
    {...props}
  >
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
))

MoonIcon.displayName = 'MoonIcon'

export function ThemeToggle() {
  // Wrap hook usage in try-catch to catch potential initialization errors
  try {
    const { theme, setTheme } = useTheme()

    // Validate hook values before usage
    if (typeof theme === 'undefined' || typeof setTheme !== 'function') {
      console.error('[ThemeToggle] Theme context not properly initialized:', {
        hasTheme: typeof theme !== 'undefined',
        hasSetTheme: typeof setTheme === 'function'
      })
      return null // Return null if theme context is not properly initialized
    }

    console.log('[ThemeToggle] Rendering with theme:', theme)

    return (
      <button
        onClick={() => {
          try {
            setTheme(theme === "dark" ? "light" : "dark")
          } catch (error) {
            console.error('[ThemeToggle] Error during theme toggle:', error)
          }
        }}
        className="relative w-6 h-6 flex items-center justify-center"
      >
        <SunIcon className="h-[1.1rem] w-[1.1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <MoonIcon className="absolute h-[1.1rem] w-[1.1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </button>
    )
  } catch (error) {
    console.error('[ThemeToggle] Error initializing theme hook:', error)
    return null // Return null if hook initialization fails
  }
}