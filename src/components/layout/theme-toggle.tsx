"use client"

import React from "react"

// Simplified approach - just a static icon to match the design exactly
export function ThemeToggle() {
  return (
    <button
      className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-white transition-colors duration-200 rounded-full hover:bg-gray-800/50"
      aria-label="Toggle theme"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-[18px] w-[18px]"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="5" />
        <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
      </svg>
    </button>
  )
}

export default ThemeToggle