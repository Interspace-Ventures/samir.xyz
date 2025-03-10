"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "./theme-toggle"

const navItems = [
  { href: "/", label: "PROFILE" },
  { href: "/portfolio", label: "PORTFOLIO" },
  { href: "/interspace", label: "INTERSPACE" },
  { href: "/perspectives", label: "PERSPECTIVES" },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/50 backdrop-blur dark:border-gray-800 dark:bg-gray-950/50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-lg font-semibold">
            Hey - I'm Samir
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative py-2 text-sm transition-colors hover:text-purple-600 dark:hover:text-purple-400
                  ${pathname === item.href ? 'text-purple-600 dark:text-purple-400' : 'text-gray-600 dark:text-gray-300'}
                  after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-purple-600 after:transition-transform after:duration-200
                  ${pathname === item.href ? 'after:scale-x-100' : ''}
                  hover:after:scale-x-100 dark:after:bg-purple-400`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}
