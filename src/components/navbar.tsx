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
    <nav className="w-full h-16 flex items-center justify-between px-4 bg-white/50 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Link 
        href="/" 
        className="text-sm font-normal tracking-widest hover:text-purple-600 dark:hover:text-purple-400"
      >
        Hey - I'm Samir
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-6">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`
              text-[13px] font-normal tracking-[0.1em] transition-colors
              hover:text-purple-600 dark:hover:text-purple-400
              ${pathname === item.href ? 'text-purple-600 dark:text-purple-400' : 'text-gray-500 dark:text-gray-400'}
            `}
          >
            {item.label}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-1.5 hover:bg-muted/10 transition-colors"
        >
          {isMenuOpen ? (
            <X className="h-4 w-4" />
          ) : (
            <Menu className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white/95 dark:bg-gray-950/95 backdrop-blur py-4 px-4 space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className={`
                block text-[13px] font-normal tracking-[0.1em] transition-colors
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