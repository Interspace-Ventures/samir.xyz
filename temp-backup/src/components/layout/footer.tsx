"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="mt-auto w-full py-8 px-6 bg-white border-t border-gray-100">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Left side - copyright and links */}
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <p className="text-gray-600 text-sm">
            © {currentYear} Samir Ghobril. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4 mt-2 justify-center md:justify-start">
            <Link href="/privacy" className="text-xs text-gray-500 hover:text-purple-600 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-gray-500 hover:text-purple-600 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
        
        {/* Right side - social links */}
        <div className="flex items-center gap-4">
          <a 
            href="https://twitter.com/samirghobril" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-purple-600 transition-colors"
            aria-label="Twitter"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
            </svg>
          </a>
          <a 
            href="https://github.com/samirghobril" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-purple-600 transition-colors"
            aria-label="GitHub"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          </a>
          <a 
            href="https://linkedin.com/in/samirghobril" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-purple-600 transition-colors"
            aria-label="LinkedIn"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}