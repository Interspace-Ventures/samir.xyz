"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from './theme-toggle'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

// Navigation links data for easier maintenance
const navLinks = [
  { href: "/profile", label: "About" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/ventures", label: "Ventures" }
]

export default function SimpleNavbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  
  // Handle hydration issue
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false)
      }
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isMenuOpen])
  
  const isDark = mounted && resolvedTheme === 'dark'
  
  // Determine if a link is active
  const isActive = (href: string) => pathname === href || pathname === `${href}/`

  return (
    <header className="w-full sticky top-0 z-50 py-4 border-b bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
      <nav className="max-w-6xl mx-auto px-4">
        {/* Desktop navbar */}
        <div className="hidden md:flex md:justify-between md:items-center">
          {/* Logo */}
          <div className="flex-shrink-0 mr-8">
            <Link href="/" className="font-bold text-lg text-gray-900 dark:text-white whitespace-nowrap">
              Hey - I&apos;m Samir
            </Link>
          </div>
          
          {/* Desktop navigation links */}
          <div className="flex items-center justify-between flex-1">
            <div className="flex space-x-8">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`inline-block px-1 py-2 font-medium transition-colors ${
                    isActive(href)
                      ? 'text-purple-600 dark:text-purple-400'
                      : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>
            
            <div>
              <ThemeToggle />
            </div>
          </div>
        </div>

        {/* Mobile navbar */}
        <div className="flex justify-between items-center md:hidden">
          <Link href="/" className="font-bold text-lg text-gray-900 dark:text-white whitespace-nowrap">
            Hey - I&apos;m Samir
          </Link>
          
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-500 dark:text-gray-400 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open menu</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>
      
      {/* Mobile menu dropdown */}
      {isMenuOpen && (
        <div className="px-4 pt-2 pb-4 space-y-1 bg-gray-50 dark:bg-gray-800 md:hidden">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`block py-2 px-4 rounded-md ${
                isActive(href)
                  ? 'bg-gray-100 text-purple-600 dark:bg-gray-700 dark:text-purple-400'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}