"use client"

import { default as NextLink } from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "./theme-toggle"
import { useState, useCallback, memo, useEffect } from "react"

const MenuIcon = () => (
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
  >
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
)

const XIcon = () => (
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
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
)

const navItems = [
  { href: "/", label: "ABOUT", isExternal: false },
  { href: "/portfolio", label: "PORTFOLIO", isExternal: false },
  { href: "/ventures", label: "VENTURES", isExternal: false }
]

const NavLink = memo(({ href, label, isActive, isMobile = false }: {
  href: string;
  label: string;
  isActive: boolean;
  isMobile?: boolean;
}) => (
  <NextLink
    href={href}
    prefetch={false}
    className={`
      ${isMobile ? 'block py-4' : 'relative'} 
      text-base font-medium tracking-wide transition-colors
      hover:text-primary dark:hover:text-primary whitespace-nowrap
      ${isActive ? 'text-primary dark:text-primary' : 'text-muted-foreground'}
      ${!isMobile ? `
        after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:w-full 
        after:origin-left after:scale-x-0 after:bg-primary after:transition-transform
        after:duration-300 after:ease-out
        ${isActive ? 'after:scale-x-100' : ''}
        hover:after:scale-x-100
      ` : ''}
    `}
  >
    {label}
  </NextLink>
));

NavLink.displayName = 'NavLink';

export default function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev)
  }, [])

  if (!mounted) {
    return (
      <nav className="sticky top-0 z-50 w-full h-20 navbar-bg border-b border-border/40 shadow-sm">
        <div className="max-w-4xl w-full mx-auto px-6 flex items-center justify-between h-full">
          <div className="text-2xl font-bold text-foreground leading-none">
            <span suppressHydrationWarning>Hey - I'm Samir</span>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((_, i) => (
              <div key={i} className="w-20 h-4 bg-muted/10 rounded animate-pulse" />
            ))}
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="sticky top-0 z-50 w-full h-20 navbar-bg border-b border-border/40 shadow-sm">
      <div className="max-w-4xl w-full mx-auto px-6 flex items-center justify-between h-full">
        <NextLink
          href="/"
          className="text-2xl font-extrabold text-foreground leading-none hover:opacity-80 transition-opacity"
          prefetch={false}
        >
          <span suppressHydrationWarning>Hey - I'm Samir</span>
        </NextLink>

        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              label={item.label}
              isActive={pathname === item.href}
            />
          ))}
          <ThemeToggle />
        </div>

        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
          <button
            onClick={toggleMenu}
            className="p-2 hover:bg-muted/10 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="absolute top-20 left-0 right-0 z-50 navbar-bg py-4 px-6 space-y-2 border-b border-border/40 shadow-sm md:hidden">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              label={item.label}
              isActive={pathname === item.href}
              isMobile={true}
            />
          ))}
        </div>
      )}
    </nav>
  )
}