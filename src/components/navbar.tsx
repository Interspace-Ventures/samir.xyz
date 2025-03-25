// Version 12.0.5 - Enhanced Navbar with active page highlighting

"use client"

import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()
  
  // Function to check if a path is active
  const isActive = (path: string) => {
    return pathname === path
  }
  
  return (
    <header className="bg-gray-900 border-b border-gray-800 py-4 sticky top-0 z-10">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <a 
          href="/" 
          className="text-xl font-bold text-white hover:text-purple-400 transition-colors"
        >
          Hey - I'm <span className="text-purple-500">Samir</span>
        </a>

        <nav className="flex items-center space-x-6">
          <a 
            href="/profile" 
            className={`font-medium transition-colors ${
              isActive('/profile') 
                ? 'text-purple-400 relative after:absolute after:bottom-[-6px] after:left-0 after:w-full after:h-[2px] after:bg-purple-500' 
                : 'text-gray-300 hover:text-purple-400'
            }`}
          >
            ABOUT
          </a>
          <a 
            href="/portfolio" 
            className={`font-medium transition-colors ${
              isActive('/portfolio') 
                ? 'text-purple-400 relative after:absolute after:bottom-[-6px] after:left-0 after:w-full after:h-[2px] after:bg-purple-500' 
                : 'text-gray-300 hover:text-purple-400'
            }`}
          >
            PORTFOLIO
          </a>
          <a 
            href="/ventures/page-fixed" 
            className={`font-medium transition-colors ${
              isActive('/ventures/page-fixed') || isActive('/ventures')
                ? 'text-purple-400 relative after:absolute after:bottom-[-6px] after:left-0 after:w-full after:h-[2px] after:bg-purple-500' 
                : 'text-gray-300 hover:text-purple-400'
            }`}
          >
            VENTURES
          </a>
        </nav>
      </div>
    </header>
  )
}