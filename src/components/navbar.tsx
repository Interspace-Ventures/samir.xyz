// Version 13.0.0 - Updated Navbar to match the provided design

"use client"

import { usePathname } from 'next/navigation'
import { ThemeToggle } from './theme-toggle'

export default function Navbar() {
  const pathname = usePathname()
  
  // Function to check if a path is active
  const isActive = (path: string) => {
    return pathname === path
  }
  
  return (
    <header className="bg-[#171717] border-b border-gray-800 py-4 sticky top-0 z-10">
      <div className="px-6 flex items-center justify-between w-full">
        <a 
          href="/" 
          className="text-xl font-bold text-white hover:text-gray-300 transition-colors"
        >
          Hey - I'm Samir
        </a>

        <nav className="flex items-center space-x-10">
          <a 
            href="/profile" 
            className={`font-medium uppercase transition-colors ${
              isActive('/profile') 
                ? 'text-white font-medium relative after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            About
          </a>
          <a 
            href="/portfolio" 
            className={`font-medium uppercase transition-colors ${
              isActive('/portfolio') 
                ? 'text-white font-medium relative after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Portfolio
          </a>
          <a 
            href="/ventures" 
            className={`font-medium uppercase transition-colors ${
              isActive('/ventures')
                ? 'text-white font-medium relative after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Ventures
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}