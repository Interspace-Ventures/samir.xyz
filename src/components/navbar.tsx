"use client"

import { default as NextLink } from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "./theme-toggle"
import { Menu, X } from "lucide-react"
import { useState, useCallback, memo } from "react"

const navItems = [
  { href: "/", label: "ABOUT", isExternal: false },
  { href: "/portfolio", label: "PORTFOLIO", isExternal: false },
  { href: "/ventures", label: "VENTURES", isExternal: false }
]

// Memoize NavLink component for better performance
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
      ${isMobile ? 'block' : 'relative'} 
      font-inter text-[13px] font-medium tracking-[0.1em] transition-colors
      hover:text-primary dark:hover:text-primary whitespace-nowrap
      ${isActive ? 'text-primary dark:text-primary' : 'text-muted-foreground'}
      ${!isMobile ? `
        after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-full 
        after:origin-left after:scale-x-0 after:bg-primary after:transition-transform
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

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev)
  }, [])

  return (
    <nav className="sticky top-0 z-50 w-full h-16 flex items-center container mx-auto px-4 bg-background/50 backdrop-blur-sm border-b border-border/40">
      <NextLink 
        href="/" 
        className="font-inter text-sm font-black tracking-widest gradient-text leading-none"
        prefetch={false}
      >
        Hey - I'm Samir
      </NextLink>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-6 ml-auto max-w-[600px] overflow-x-auto">
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

      {/* Mobile Navigation */}
      <div className="md:hidden ml-auto flex items-center gap-4">
        <ThemeToggle />
        <button
          onClick={toggleMenu}
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
        <div className="absolute top-16 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm py-4 px-4 space-y-4 border-b border-border/40 md:hidden">
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