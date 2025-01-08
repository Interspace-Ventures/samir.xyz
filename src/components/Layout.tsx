import React, { type ReactNode, useState } from "react";
import { Link } from "wouter";
import { Sun, Moon, Menu, ArrowUpRight } from "lucide-react";

export function Layout({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

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
              <button onClick={toggleTheme}>
                {isDark ? <Sun className="w-5 h-5 text-white" /> : <Moon className="w-5 h-5" />}
              </button>
              <button onClick={() => setIsOpen(!isOpen)} className={isDark ? 'text-white' : 'text-black'}>
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
              <button onClick={toggleTheme} className="ml-4">
                {isDark ? <Sun className="w-5 h-5 text-white" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile navigation */}
          {isOpen && (
            <div className="sm:hidden py-4 space-y-6">
              <Link 
                href="/profile" 
                className={`block py-2 uppercase ${isDark ? 'text-white' : 'text-black'} hover:text-[#7343d0]`}
                onClick={() => setIsOpen(false)}
              >
                Profile
              </Link>
              <Link 
                href="/portfolio" 
                className={`block py-2 uppercase ${isDark ? 'text-white' : 'text-black'} hover:text-[#7343d0]`}
                onClick={() => setIsOpen(false)}
              >
                Portfolio
              </Link>
              <div className="flex flex-col gap-6">
                <a 
                  href="https://interspace.samir.xyz/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`block py-2 uppercase ${isDark ? 'text-white' : 'text-black'} hover:text-[#7343d0] inline-flex items-center gap-1`}
                >
                  Interspace <ArrowUpRight className="w-4 h-4" />
                </a>
                <a 
                  href="https://perspectives.samir.xyz/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`block py-2 uppercase ${isDark ? 'text-white' : 'text-black'} hover:text-[#7343d0] inline-flex items-center gap-1`}
                >
                  Perspectives <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      <main className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 ${isDark ? 'text-white' : 'text-black'}`}>
        {children}
      </main>

      {/* Footer */}
      <footer className={`py-8 mt-12 border-t ${isDark ? 'border-gray-800' : 'border-gray-100'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Built with Replit AI at the speed of thought - Interspace Labs 2025
          </p>
        </div>
      </footer>
    </div>
  );
}