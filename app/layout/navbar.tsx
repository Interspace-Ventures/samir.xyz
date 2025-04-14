import { Link } from "@remix-run/react";
import React, { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <div className="flex items-center">
                <span className="text-xl font-bold text-purple-700">samir.xyz</span>
              </div>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6">
              <Link
                to="/"
                className="text-gray-700 hover:text-purple-700 px-3 py-2 text-sm font-medium"
              >
                Profile
              </Link>
              <Link
                to="/portfolio"
                className="text-gray-700 hover:text-purple-700 px-3 py-2 text-sm font-medium"
              >
                Portfolio
              </Link>
              <Link
                to="/ventures"
                className="text-gray-700 hover:text-purple-700 px-3 py-2 text-sm font-medium"
              >
                Ventures
              </Link>
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-purple-700"
              aria-label="Main menu"
            >
              <svg
                className={`h-6 w-6 ${isMenuOpen ? 'hidden' : 'block'}`}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg 
                className={`h-6 w-6 ${isMenuOpen ? 'block' : 'hidden'}`} 
                stroke="currentColor" 
                fill="none" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu, show/hide based on menu state */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            className="text-gray-700 hover:text-purple-700 block px-3 py-2 text-base font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Profile
          </Link>
          <Link
            to="/portfolio"
            className="text-gray-700 hover:text-purple-700 block px-3 py-2 text-base font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Portfolio
          </Link>
          <Link
            to="/ventures"
            className="text-gray-700 hover:text-purple-700 block px-3 py-2 text-base font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Ventures
          </Link>
        </div>
      </div>
    </nav>
  );
}