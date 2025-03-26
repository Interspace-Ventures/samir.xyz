"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from './theme-toggle'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

// Ultra simple navbar with fixed-width grid layout to ensure proper spacing
export default function SimpleNavbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
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
  
  return (
    <header 
      className={`w-full sticky top-0 z-50 py-4 ${isDark ? 'bg-gray-900 border-b border-gray-800' : 'bg-white border-b border-gray-200'}`}
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Hidden on mobile */}
        <div className="hidden md:grid md:grid-cols-12 md:gap-4 items-center">
          {/* Logo - 4 columns */}
          <div className="col-span-4">
            <Link href="/" className={`font-bold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>
              <span className="whitespace-nowrap">Hey - I&apos;m Samir</span>
            </Link>
          </div>
          
          {/* Nav Links - 7 columns */}
          <div className="col-span-7 flex justify-start space-x-12">
            <div>
              <Link 
                href="/profile" 
                className={`font-medium ${pathname === '/profile' || pathname === '/profile/' 
                  ? `text-purple-600 ${isDark ? 'dark:text-purple-400' : ''}` 
                  : `${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}`}
              >
                About
              </Link>
            </div>
            
            <div>
              <Link 
                href="/portfolio" 
                className={`font-medium ${pathname === '/portfolio' || pathname === '/portfolio/' 
                  ? `text-purple-600 ${isDark ? 'dark:text-purple-400' : ''}` 
                  : `${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}`}
              >
                Portfolio
              </Link>
            </div>
            
            <div>
              <Link 
                href="/ventures" 
                className={`font-medium ${pathname === '/ventures' || pathname === '/ventures/' 
                  ? `text-purple-600 ${isDark ? 'dark:text-purple-400' : ''}` 
                  : `${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}`}
              >
                Ventures
              </Link>
            </div>
          </div>
          
          {/* Theme toggle - 1 column */}
          <div className="col-span-1 flex justify-end">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile view */}
        <div className="flex justify-between items-center md:hidden">
          <Link href="/" className={`font-bold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>
            <span className="whitespace-nowrap">Hey - I&apos;m Samir</span>
          </Link>
          
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-md ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
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
      </div>
      
      {/* Mobile menu dropdown */}
      {isMenuOpen && (
        <div className={`px-4 pt-2 pb-4 space-y-2 md:hidden ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <Link
            href="/profile"
            className={`block py-2 px-4 rounded-md ${
              pathname === '/profile' || pathname === '/profile/' 
                ? `${isDark ? 'bg-gray-700 text-purple-400' : 'bg-gray-100 text-purple-600'}`
                : `${isDark ? 'text-white hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          
          <Link
            href="/portfolio"
            className={`block py-2 px-4 rounded-md ${
              pathname === '/portfolio' || pathname === '/portfolio/' 
                ? `${isDark ? 'bg-gray-700 text-purple-400' : 'bg-gray-100 text-purple-600'}`
                : `${isDark ? 'text-white hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Portfolio
          </Link>
          
          <Link
            href="/ventures"
            className={`block py-2 px-4 rounded-md ${
              pathname === '/ventures' || pathname === '/ventures/' 
                ? `${isDark ? 'bg-gray-700 text-purple-400' : 'bg-gray-100 text-purple-600'}`
                : `${isDark ? 'text-white hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Ventures
          </Link>
        </div>
      )}
    </header>
  )
}