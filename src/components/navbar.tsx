"use client"

import { default as NextLink } from "next/link"
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
    <nav className="sticky top-0 z-50 w-full h-16 flex items-center container mx-auto px-4 bg-background/50 backdrop-blur-sm border-b border-border/40">
      <NextLink 
        href="/" 
        className="text-sm font-black tracking-widest gradient-text font-inter leading-none"
      >
        Hey - I'm Samir
      </NextLink>

      {/* Desktop Navigation */}
      <div className="flex items-center space-x-6 ml-auto max-w-[600px] overflow-x-auto">
        {navItems.map((item) => (
          <NextLink
            key={item.href}
            href={item.href}
            className={`
              relative text-[13px] font-inter font-medium tracking-[0.1em] transition-colors whitespace-nowrap
              hover:text-primary dark:hover:text-primary
              ${pathname === item.href ? 'text-primary dark:text-primary' : 'text-muted-foreground'}
              after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-full 
              after:origin-left after:scale-x-0 after:bg-primary after:transition-transform
              ${pathname === item.href ? 'after:scale-x-100' : ''}
              hover:after:scale-x-100
            `}
          >
            {item.label}
          </NextLink>
        ))}

        <ThemeToggle />
      </div>

      {/* Mobile Navigation */}
      <div className="hidden max-[480px]:flex ml-auto items-center gap-4">
        <ThemeToggle />
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-1.5 hover:bg-muted/10 rounded-md transition-colors"
          aria-label="Toggle menu"
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
        <div className="absolute top-16 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm py-4 px-4 space-y-4 border-b border-border/40 max-[480px]:block hidden">
          {navItems.map((item) => (
            <NextLink
              key={item.href}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className={`
                block text-[13px] font-inter font-medium tracking-[0.1em] transition-colors
                hover:text-primary dark:hover:text-primary
                ${pathname === item.href ? 'text-primary dark:text-primary' : 'text-muted-foreground'}
              `}
            >
              {item.label}
            </NextLink>
          ))}
        </div>
      )}
    </nav>
  )
}