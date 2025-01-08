import React, { type ReactNode, useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Sun, Moon, Menu, ArrowUpRight } from "lucide-react";

export function Layout({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle escape key press
  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }
    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${isDark ? 'dark bg-gray-900' : 'bg-white'}`}>
      <nav className={`sticky top-0 backdrop-blur-sm border-b z-50 ${isDark ? 'border-gray-700 bg-gray-900/80' : 'border-gray-100 bg-white/80'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className={`text-xl font-bold ${isDark ? 'text-white' : 'text-black'} hover:text-[#7343d0]`}>
              Hey - I'm Samir
            </Link>

            {/* Mobile menu button */}
            <div className="flex items-center gap-4 sm:hidden">
              <button 
                onClick={toggleTheme} 
                className={isDark ? 'text-white' : 'text-black'}
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                className={`${isDark ? 'text-white' : 'text-black'} p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7343d0]`}
                aria-label="Toggle menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

            {/* Desktop navigation */}
            <div className="hidden sm:flex items-center space-x-8">
              <Link href="/profile" className={`nav-link uppercase ${isDark ? 'text-white' : 'text-black'} hover:text-[#7343d0]`}>
                Profile
              </Link>
              <Link href="/portfolio" className={`nav-link uppercase ${isDark ? 'text-white' : 'text-black'} hover:text-[#7343d0]`}>
                Portfolio
              </Link>
              <a href="https://interspace.samir.xyz/" target="_blank" rel="noopener noreferrer" className={`nav-link uppercase ${isDark ? 'text-white' : 'text-black'} hover:text-[#7343d0] inline-flex items-center gap-1`}>
                Interspace <ArrowUpRight className="w-4 h-4" />
              </a>
              <a href="https://perspectives.samir.xyz/" target="_blank" rel="noopener noreferrer" className={`nav-link uppercase ${isDark ? 'text-white' : 'text-black'} hover:text-[#7343d0] inline-flex items-center gap-1`}>
                Perspectives <ArrowUpRight className="w-4 h-4" />
              </a>
              <button 
                onClick={toggleTheme} 
                className="ml-4"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="w-5 h-5 text-white" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile navigation */}
          <div
            ref={menuRef}
            className={`sm:hidden overflow-hidden transition-all duration-300 ease-in-out ${
              isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="py-4 space-y-2">
              {[
                { href: "/profile", label: "Profile" },
                { href: "/portfolio", label: "Portfolio" },
                { href: "https://interspace.samir.xyz/", label: "Interspace", external: true },
                { href: "https://perspectives.samir.xyz/", label: "Perspectives", external: true }
              ].map(({ href, label, external }) => (
                external ? (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block w-full py-2 px-3 ${isDark ? 'text-white hover:bg-gray-800' : 'text-black hover:bg-gray-100'} rounded-md transition-colors`}
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="flex items-center justify-between">
                      {label}
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </a>
                ) : (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setIsOpen(false)}
                    className={`block w-full py-2 px-3 ${isDark ? 'text-white hover:bg-gray-800' : 'text-black hover:bg-gray-100'} rounded-md transition-colors`}
                  >
                    {label}
                  </Link>
                )
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 ${isDark ? 'text-white' : 'text-black'}`}>
        {children}
      </main>

      <footer className={`py-8 mt-12 border-t ${isDark ? 'border-gray-800' : 'border-gray-100'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            © Interspace Labs 2025. Built with{' '}
            <a 
              href="https://www.replit.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#7343d0] hover:text-[#5f35b5] font-medium transition-colors"
            >
              Replit AI
            </a>{' '}
            at the speed of thought
          </p>
        </div>
      </footer>
    </div>
  );
}