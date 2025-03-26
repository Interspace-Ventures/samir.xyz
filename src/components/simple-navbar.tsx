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
    <header className="bg-[#111111] w-full h-12 flex items-center border-b border-gray-800">
      <div className="max-w-screen-xl mx-auto px-6 w-full flex items-center justify-between">
        <a 
          href="/" 
          className="text-white font-medium text-base"
        >
          Hey - I&apos;m Samir
        </a>

        <div className="flex items-center">
          <a 
            href="/profile" 
            className={`text-sm uppercase px-2 ${isActive('/profile') ? 'text-white' : 'text-gray-400 hover:text-white'}`}
          >
            About
          </a>
          <a 
            href="/portfolio" 
            className={`text-sm uppercase px-2 ${isActive('/portfolio') ? 'text-white' : 'text-gray-400 hover:text-white'}`}
          >
            Portfolio
          </a>
          <a 
            href="/ventures" 
            className={`text-sm uppercase px-2 ${isActive('/ventures') ? 'text-white' : 'text-gray-400 hover:text-white'}`}
          >
            Ventures
          </a>
          
          <div className="ml-5">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}