"use client"

import { default as NextLink } from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "./theme-toggle"
import { useState, useEffect } from "react"

const navItems = [
  { href: "/", label: "ABOUT", isExternal: false },
  { href: "/portfolio", label: "PORTFOLIO", isExternal: false },
  { href: "/ventures", label: "VENTURES", isExternal: false }
] as const

const NavbarSkeleton = () => (
  <div className="fixed top-0 left-0 right-0 z-50 h-24 md:h-28 border-b border-gray-700/50 bg-gradient-to-b from-black to-gray-900/90 backdrop-blur-md shadow-lg shadow-black/30">
    <div className="max-w-4xl mx-auto px-6 h-full flex items-center justify-between">
      <div className="h-8 w-1/3 bg-gray-800/50 rounded animate-pulse" />
      <div className="hidden md:flex items-center space-x-8">
        {Array(3).fill(null).map((_, i) => (
          <div key={i} className="h-4 w-20 bg-gray-800/50 rounded animate-pulse" />
        ))}
      </div>
    </div>
  </div>
)

export default function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <NavbarSkeleton />
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-24 md:h-28 border-b border-gray-700/50 bg-gradient-to-b from-black to-gray-900/90 backdrop-blur-md shadow-lg shadow-black/30">
      <div className="max-w-4xl mx-auto px-6 h-full flex items-center justify-between">
        <NextLink
          href="/"
          className="text-2xl font-bold text-white leading-none hover:opacity-80 transition-opacity"
          prefetch={false}
        >
          Hey - I'm Samir
        </NextLink>

        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <NextLink
              key={item.href}
              href={item.href}
              prefetch={false}
              className={`
                relative text-base font-medium tracking-wide transition-colors
                hover:text-purple-400 whitespace-nowrap
                ${pathname === item.href ? 'text-purple-400' : 'text-gray-300'}
                after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:w-full 
                after:origin-left after:scale-x-0 after:bg-purple-500 after:transition-transform
                after:duration-300 after:ease-out
                ${pathname === item.href ? 'after:scale-x-100' : ''}
                hover:after:scale-x-100
              `}
            >
              {item.label}
            </NextLink>
          ))}
          <ThemeToggle />
        </div>

        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
          <button
            onClick={() => setIsMenuOpen(prev => !prev)}
            className="p-2 hover:bg-purple-900/30 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="text-purple-400"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="text-gray-300 hover:text-purple-400"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="absolute top-24 left-0 right-0 z-50 bg-gradient-to-b from-black/95 to-gray-900/95 backdrop-blur-md border-b border-gray-700/50 py-4 px-6 space-y-2 md:hidden shadow-lg">
          {navItems.map((item) => (
            <NextLink
              key={item.href}
              href={item.href}
              prefetch={false}
              className={`
                block py-4 text-base font-medium tracking-wide transition-colors
                hover:text-purple-400 whitespace-nowrap
                ${pathname === item.href ? 'text-purple-400' : 'text-gray-300'}
                ${pathname === item.href ? 'border-l-2 border-purple-500 pl-4' : ''}
              `}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </NextLink>
          ))}
        </div>
      )}
    </div>
  )
}