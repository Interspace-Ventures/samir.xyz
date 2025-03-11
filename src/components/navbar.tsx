"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "./theme-toggle"
import { Menu, X } from "lucide-react"
import { useState } from "react"

const navItems = [
  { href: "/profile", label: "ABOUT", isExternal: false },
  { href: "/portfolio", label: "PORTFOLIO", isExternal: false },
  { href: "/ventures", label: "VENTURES", isExternal: false }
]

export default function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full h-16 flex items-center container mx-auto px-4 bg-white/50 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Link 
        href="/" 
        className="text-sm font-bold tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-400 dark:from-purple-400 dark:to-purple-200 font-inter"
      >
        Hey - I'm Samir
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-6 ml-auto">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`
              text-[13px] font-inter font-normal tracking-[0.1em] transition-colors
              hover:text-purple-600 dark:hover:text-purple-400
              ${pathname === item.href ? 'text-purple-600 dark:text-purple-400' : 'text-gray-500 dark:text-gray-400'}
            `}
          >
            {item.label}
          </Link>
        ))}

        <ThemeToggle />
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden ml-auto flex items-center gap-4">
        <ThemeToggle />
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-1.5 hover:bg-muted/10 transition-colors"
        >
          {isMenuOpen ? (
            <X className="h-4 w-4" />
          ) : (
            <Menu className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 z-50 bg-white/95 dark:bg-gray-950/95 backdrop-blur py-4 px-4 space-y-4 border-b border-gray-200 dark:border-gray-800">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className={`
                block text-[13px] font-inter font-normal tracking-[0.1em] transition-colors
                hover:text-purple-600 dark:hover:text-purple-400
                ${pathname === item.href ? 'text-purple-600 dark:text-purple-400' : 'text-gray-500 dark:text-gray-400'}
              `}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}