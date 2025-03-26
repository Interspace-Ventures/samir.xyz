"use client"

import { usePathname } from 'next/navigation'
import { ThemeToggle } from './theme-toggle'

export default function SimpleNavbar() {
  const pathname = usePathname()
  
  // Function to determine if a path is active
  const isActive = (path: string) => {
    return pathname === path || pathname === path + '/'
  }
  
  return (
    <header className="bg-[#171717] w-full h-[64px] flex items-center border-b border-gray-800/50 sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-6 w-full flex items-center justify-between">
        <a 
          href="/" 
          className="text-white font-medium text-lg"
        >
          Hey - I&apos;m Samir
        </a>

        <nav className="flex items-center">
          <div className="hidden md:flex items-center space-x-8 mr-6">
            <a 
              href="/profile" 
              className={`text-sm uppercase tracking-wider font-medium ${isActive('/profile') ? 'text-white' : 'text-gray-400 hover:text-white transition-colors duration-200'}`}
            >
              About
            </a>
            <a 
              href="/portfolio" 
              className={`text-sm uppercase tracking-wider font-medium ${isActive('/portfolio') ? 'text-white' : 'text-gray-400 hover:text-white transition-colors duration-200'}`}
            >
              Portfolio
            </a>
            <a 
              href="/ventures" 
              className={`text-sm uppercase tracking-wider font-medium ${isActive('/ventures') ? 'text-white' : 'text-gray-400 hover:text-white transition-colors duration-200'}`}
            >
              Ventures
            </a>
          </div>
          
          {/* Mobile menu - simplified for now */}
          <div className="md:hidden flex items-center space-x-4">
            <a 
              href="/profile" 
              className="text-sm uppercase tracking-wider font-medium text-gray-400 hover:text-white transition-colors duration-200"
            >
              About
            </a>
            <a 
              href="/portfolio" 
              className="text-sm uppercase tracking-wider font-medium text-gray-400 hover:text-white transition-colors duration-200"
            >
              Portfolio
            </a>
            <a 
              href="/ventures" 
              className="text-sm uppercase tracking-wider font-medium text-gray-400 hover:text-white transition-colors duration-200"
            >
              Ventures
            </a>
          </div>
          
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}