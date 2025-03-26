"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from './theme-toggle'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

export default function SimpleNavbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  
  // Handle client side mounting for theme detection
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Close the menu when window is resized
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false)
      }
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isMenuOpen])
  
  // Function to determine if a path is active
  const isActive = (path: string) => {
    return pathname === path || pathname === path + '/'
  }
  
  // Detect if we're in dark mode for proper styling
  const isDark = mounted && resolvedTheme === 'dark'
  
  // Navigation links definition to avoid repetition
  const navLinks = [
    { href: '/profile', label: 'About' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/ventures', label: 'Ventures' }
  ]
  
  return (
    <header className={`w-full h-16 sticky top-0 z-50 transition-colors duration-200 
      ${isDark 
        ? 'bg-gray-900 border-b border-gray-800/50 shadow-md' 
        : 'bg-white border-b border-gray-200 shadow-sm'}`}>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              href="/" 
              className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}
            >
              Hey - I&apos;m Samir
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:space-x-6">
            {navLinks.map(link => (
              <Link 
                key={link.href}
                href={link.href}
                className={`
                  inline-block text-sm font-medium px-2 py-1 border-b-2 transition-colors
                  ${isActive(link.href) 
                    ? `border-purple-500 ${isDark ? 'text-white' : 'text-gray-900'}` 
                    : `border-transparent ${isDark ? 'text-gray-300' : 'text-gray-600'} 
                      hover:${isDark ? 'text-white' : 'text-gray-900'} hover:border-purple-400`
                  }
                `}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center">
            {/* Theme toggle */}
            <ThemeToggle />
            
            {/* Mobile menu button - with more spacing */}
            <button 
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden ml-4 p-2 rounded-md focus:outline-none
                ${isDark 
                  ? 'text-gray-400 hover:text-white hover:bg-gray-800' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                aria-hidden="true"
              >
                {isMenuOpen ? (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                ) : (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 6h16M4 12h16M4 18h16" 
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu - simpler implementation */}
      {isMenuOpen && (
        <div className={`md:hidden ${isDark ? 'bg-gray-900' : 'bg-white'} border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
          <nav className="px-4 pt-2 pb-3 space-y-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  block px-3 py-2 rounded-md text-base font-medium
                  ${isActive(link.href)
                    ? isDark 
                      ? 'bg-gray-800 text-white' 
                      : 'bg-gray-100 text-gray-900'
                    : isDark 
                      ? 'text-gray-300 hover:bg-gray-800 hover:text-white' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }
                `}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}