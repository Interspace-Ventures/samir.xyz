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
        <div className="max-w-6xl mx-auto px-2 xs:px-3 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo/Brand */}
            <Link 
              href="/" 
              className="text-lg md:text-xl whitespace-nowrap font-bold bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text hover:from-purple-500 hover:to-blue-500 transition-all duration-200"
            >
              Hey - I'm Samir
            </Link>

            {/* Mobile menu button */}
            <div className="flex items-center gap-1 sm:hidden">
              <button 
                onClick={toggleTheme} 
                className={`p-1.5 rounded-md transition-colors ${isDark ? 'text-white hover:bg-gray-800' : 'text-black hover:bg-gray-100'}`}
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                className={`p-1.5 rounded-md transition-colors ${isDark ? 'text-white hover:bg-gray-800' : 'text-black hover:bg-gray-100'}`}
                aria-label="Toggle menu"
              >
                <Menu className="w-4 h-4" />
              </button>
            </div>

            {/* Desktop navigation - Adjusted spacing and text sizes */}
            <div className="hidden sm:flex items-center space-x-3 md:space-x-4 lg:space-x-6">
              <Link 
                href="/about" 
                className={`nav-link text-xs sm:text-sm md:text-base uppercase ${isDark ? 'text-white' : 'text-black'} hover:text-[#7343d0] transition-colors duration-200 px-1.5 py-1`}
              >
                About
              </Link>
              <Link 
                href="/portfolio" 
                className={`nav-link text-xs sm:text-sm md:text-base uppercase ${isDark ? 'text-white' : 'text-black'} hover:text-[#7343d0] transition-colors duration-200 px-1.5 py-1`}
              >
                Portfolio
              </Link>
              <Link 
                href="/ventures" 
                className={`nav-link text-xs sm:text-sm md:text-base uppercase ${isDark ? 'text-white' : 'text-black'} hover:text-[#7343d0] transition-colors duration-200 px-1.5 py-1`}
              >
                Ventures
              </Link>
              <button 
                onClick={toggleTheme} 
                className={`p-1.5 rounded-md transition-colors ${isDark ? 'text-white hover:bg-gray-800' : 'text-black hover:bg-gray-100'}`}
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="w-4 h-4 md:w-5 md:h-5" /> : <Moon className="w-4 h-4 md:w-5 md:h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile navigation - Improved transitions and spacing */}
          <div
            ref={menuRef}
            className={`sm:hidden overflow-hidden transition-all duration-300 ease-in-out ${
              isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="py-3 space-y-1.5">
              <Link
                href="/about"
                onClick={() => setIsOpen(false)}
                className={`block w-full py-2 px-3 text-sm rounded-md transition-colors ${
                  isDark ? 'text-white hover:bg-gray-800' : 'text-black hover:bg-gray-100'
                }`}
              >
                About
              </Link>
              <Link
                href="/portfolio"
                onClick={() => setIsOpen(false)}
                className={`block w-full py-2 px-3 text-sm rounded-md transition-colors ${
                  isDark ? 'text-white hover:bg-gray-800' : 'text-black hover:bg-gray-100'
                }`}
              >
                Portfolio
              </Link>
              <Link
                href="/ventures"
                onClick={() => setIsOpen(false)}
                className={`block w-full py-2 px-3 text-sm rounded-md transition-colors ${
                  isDark ? 'text-white hover:bg-gray-800' : 'text-black hover:bg-gray-100'
                }`}
              >
                Ventures
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className={`max-w-6xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-8 sm:py-12 ${isDark ? 'text-white' : 'text-black'}`}>
        {children}
      </main>

      <footer className={`py-8 mt-12 border-t ${isDark ? 'border-gray-800' : 'border-gray-100'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            © <Link href="/ventures" className="text-[#7343d0] hover:text-[#5f35b5] font-medium transition-colors">Interspace Ventures</Link> 2025. Built with{' '}
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