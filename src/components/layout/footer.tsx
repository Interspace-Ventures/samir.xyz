"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import getVersionInfo from "../../utils/version"

const Footer = () => {
  const [year, setYear] = useState("")
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { version } = getVersionInfo() // Get version from utility

  useEffect(() => {
    setYear(new Date().getFullYear().toString())
    setMounted(true)
  }, [])

  // Detect if we're in dark mode for proper styling
  const isDark = mounted && resolvedTheme === 'dark'

  return (
    <footer className={`w-full mt-10 transition-colors duration-200
      ${isDark 
        ? 'border-t border-gray-800/30 text-gray-400 bg-gray-900/50' 
        : 'border-t border-gray-200 text-gray-600 bg-gray-50'}`}>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm">
            © <Link 
                href="/ventures" 
                className={`font-medium transition-colors duration-200
                  ${isDark 
                    ? 'text-purple-400 hover:text-purple-300' 
                    : 'text-purple-600 hover:text-purple-700'}`}
              >
                Interspace Ventures
              </Link> {year || "2025"}
          </div>
          <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
            Built with Replit AI at the speed of thought • v{version}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer