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

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
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
                className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="w-5 h-5 text-white" /> : <Moon className="w-5 h-5" />}
              </button>
              <button 
                onClick={toggleMenu} 
                className={`p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${isDark ? 'text-white' : 'text-black'}`}
                aria-label="Toggle menu"
                aria-expanded={isOpen}
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
              <a 
                href="https://interspace.samir.xyz/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`nav-link uppercase ${isDark ? 'text-white' : 'text-black'} hover:text-[#7343d0] inline-flex items-center gap-1`}
              >
                Interspace <ArrowUpRight className="w-4 h-4" />
              </a>
              <a 
                href="https://perspectives.samir.xyz/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`nav-link uppercase ${isDark ? 'text-white' : 'text-black'} hover:text-[#7343d0] inline-flex items-center gap-1`}
              >
                Perspectives <ArrowUpRight className="w-4 h-4" />
              </a>
              <button 
                onClick={toggleTheme} 
                className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="w-5 h-5 text-white" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile navigation */}
          <div
            ref={menuRef}
            className="sm:hidden"
            style={{
              maxHeight: isOpen ? '300px' : '0',
              opacity: isOpen ? '1' : '0',
              overflow: 'hidden',
              transition: 'max-height 0.3s ease-in-out, opacity 0.2s ease-in-out',
              visibility: isOpen ? 'visible' : 'hidden'
            }}
            aria-hidden={!isOpen}
          >
            <div className="py-4 space-y-4">
              <Link 
                href="/profile" 
                className={`block py-2 px-3 rounded-md uppercase ${isDark ? 'text-white' : 'text-black'} hover:text-[#7343d0] hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors`}
                onClick={() => setIsOpen(false)}
              >
                Profile
              </Link>
              <Link 
                href="/portfolio" 
                className={`block py-2 px-3 rounded-md uppercase ${isDark ? 'text-white' : 'text-black'} hover:text-[#7343d0] hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors`}
                onClick={() => setIsOpen(false)}
              >
                Portfolio
              </Link>
              <div className="space-y-4">
                <a 
                  href="https://interspace.samir.xyz/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`block py-2 px-3 rounded-md uppercase ${isDark ? 'text-white' : 'text-black'} hover:text-[#7343d0] hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center justify-between`}
                >
                  <span>Interspace</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <a 
                  href="https://perspectives.samir.xyz/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`block py-2 px-3 rounded-md uppercase ${isDark ? 'text-white' : 'text-black'} hover:text-[#7343d0] hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center justify-between`}
                >
                  <span>Perspectives</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 ${isDark ? 'text-white' : 'text-black'}`}>
        {children}
      </main>

      {/* Footer */}
      <footer className={`py-8 mt-12 border-t ${isDark ? 'border-gray-800' : 'border-gray-100'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Built with <a href="https://www.replit.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#7343d0] transition-colors">Replit AI</a> at the speed of thought - Interspace Labs 2025
          </p>
        </div>
      </footer>
    </div>
  );
}