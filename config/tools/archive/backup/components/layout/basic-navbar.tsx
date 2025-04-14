"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function BasicNavbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <div className="w-full bg-white py-4 border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-5 flex justify-between items-center">
        <Link href="/" className="font-bold text-lg text-gray-900 no-underline">
          Hey - I&apos;m Samir
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <ul className="flex list-none m-0 p-0 space-x-10">
            <li>
              <Link 
                href="/profile/" 
                className={`no-underline font-medium ${
                  pathname.startsWith('/profile') ? 'text-purple-600' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                About
              </Link>
            </li>
            <li>
              <Link 
                href="/portfolio/" 
                className={`no-underline font-medium ${
                  pathname.startsWith('/portfolio') ? 'text-purple-600' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Portfolio
              </Link>
            </li>
            <li>
              <Link 
                href="/ventures/" 
                className={`no-underline font-medium ${
                  pathname.startsWith('/ventures') ? 'text-purple-600' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Ventures
              </Link>
            </li>
          </ul>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMobileMenu}
          className="md:hidden p-2 bg-transparent border-0 cursor-pointer"
          aria-label="Toggle mobile menu"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-5 py-4 bg-gray-50 border-t border-gray-200">
          <ul className="list-none m-0 p-0">
            <li className="mb-4">
              <Link 
                href="/profile/"
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-1 font-medium ${
                  pathname.startsWith('/profile') ? 'text-purple-600' : 'text-gray-600'
                }`}
              >
                About
              </Link>
            </li>
            <li className="mb-4">
              <Link 
                href="/portfolio/"
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-1 font-medium ${
                  pathname.startsWith('/portfolio') ? 'text-purple-600' : 'text-gray-600'
                }`}
              >
                Portfolio
              </Link>
            </li>
            <li>
              <Link 
                href="/ventures/"
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-1 font-medium ${
                  pathname.startsWith('/ventures') ? 'text-purple-600' : 'text-gray-600'
                }`}
              >
                Ventures
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}