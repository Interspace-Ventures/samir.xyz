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
  <header className="sticky top-0 left-0 right-0 z-50 h-16 w-full bg-[#111111] border-b border-gray-800">
    <div className="w-full px-6 h-full flex items-center justify-between">
      <div className="h-8 w-1/3 bg-gray-800/50 rounded animate-pulse" />
      <div className="hidden md:flex items-center space-x-8">
        {Array(3).fill(null).map((_, i) => (
          <div key={i} className="h-4 w-20 bg-gray-800/50 rounded animate-pulse" />
        ))}
      </div>
    </div>
  </header>
)

export default function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  if (!mounted) {
    return <NavbarSkeleton />
  }

  return (
    <header className={`sticky top-0 left-0 right-0 z-50 h-16 w-full transition-all duration-300 ${scrolled ? 'bg-[#111111]/95 backdrop-blur-sm shadow-md' : 'bg-[#111111]'} border-b border-gray-800`}>
      <div className="w-full px-6 h-full flex items-center justify-between">
        <NextLink
          href="/"
          className="text-xl font-bold text-white leading-none hover:opacity-80 transition-opacity"
          prefetch={false}
        >
          Hey - I'm Samir
        </NextLink>

        <div className="hidden xs:flex items-center space-x-8">
          {navItems.map((item) => (
            <NextLink
              key={item.href}
              href={item.href}
              prefetch={false}
              className={`
                relative text-sm font-medium tracking-wide transition-colors
                whitespace-nowrap uppercase text-white
                ${pathname === item.href ? 'border-b-2 border-white pb-1' : ''}
                hover:opacity-80
              `}
            >
              {item.label}
            </NextLink>
          ))}
          <ThemeToggle />
        </div>

        <div className="xs:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(prev => !prev)}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="text-white"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="text-white"
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
        <div className="absolute top-16 left-0 right-0 z-50 bg-[#111111] border-b border-gray-800 py-4 px-6 space-y-4 xs:hidden">
          {navItems.map((item) => (
            <NextLink
              key={item.href}
              href={item.href}
              prefetch={false}
              className={`
                block py-2 text-sm font-medium tracking-wide transition-colors uppercase
                text-white whitespace-nowrap
                ${pathname === item.href ? 'border-l-2 border-white pl-3' : ''}
                hover:opacity-80
              `}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </NextLink>
          ))}
          <div className="py-2">
            <ThemeToggle />
          </div>
        </div>
      )}
    </header>
  )
}