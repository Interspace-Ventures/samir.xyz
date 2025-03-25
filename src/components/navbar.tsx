// Version 13.0.1 - Fixed styling to exactly match the provided design

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
    <header className="bg-[#171717] border-b border-gray-800 py-4 sticky top-0 z-10 h-14 flex items-center">
      <div className="px-6 flex items-center justify-between w-full">
        <a 
          href="/" 
          className="text-base font-medium text-white hover:text-gray-300 transition-colors"
        >
          Hey - I'm Samir
        </a>

        <div className="flex items-center">
          <nav className="flex items-center">
            <a 
              href="/profile" 
              className="text-sm font-medium uppercase transition-colors px-2 text-gray-400 hover:text-white"
            >
              About
            </a>
            <a 
              href="/portfolio" 
              className="text-sm font-medium uppercase transition-colors px-2 text-gray-400 hover:text-white"
            >
              Portfolio
            </a>
            <a 
              href="/ventures" 
              className={`text-sm font-medium uppercase transition-colors px-2 ${
                isActive('/ventures') || isActive('/ventures/') 
                  ? 'text-white font-medium' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Ventures
            </a>
          </nav>
          <div className="ml-4">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}