"use client";

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useState } from 'react';

interface NavItemProps {
  href: string;
  label: string;
  className?: string;
}

const NavItem = ({ href, label, className }: NavItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        'relative px-3 py-2 transition-colors hover:text-primary',
        isActive ? 'text-primary font-medium' : 'text-muted-foreground',
        className
      )}
    >
      {label}
      {isActive && (
        <span className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-primary rounded-full" />
      )}
    </Link>
  );
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle('dark', newMode);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold tracking-tight">DevFolio</span>
          </Link>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <NavItem href="/" label="Home" />
          <NavItem href="#about" label="About" />
          <NavItem href="#projects" label="Projects" />
          <NavItem href="#ventures" label="Ventures" />
          <NavItem href="#contact" label="Contact" />
          
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full hover:bg-accent transition-colors"
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
        </nav>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 md:hidden">
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full hover:bg-accent transition-colors mr-2"
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
          
          <button
            onClick={toggleMenu}
            className="p-2 rounded-md hover:bg-accent transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="absolute inset-x-0 top-full border-b bg-background py-4 shadow-lg md:hidden animate-fade-in">
            <nav className="container flex flex-col gap-4">
              <NavItem href="/" label="Home" className="w-full px-4 py-3 hover:bg-accent" />
              <NavItem href="#about" label="About" className="w-full px-4 py-3 hover:bg-accent" />
              <NavItem href="#projects" label="Projects" className="w-full px-4 py-3 hover:bg-accent" />
              <NavItem href="#ventures" label="Ventures" className="w-full px-4 py-3 hover:bg-accent" />
              <NavItem href="#contact" label="Contact" className="w-full px-4 py-3 hover:bg-accent" />
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
