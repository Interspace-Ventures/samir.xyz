"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 w-full bg-white z-50 border-b border-gray-100 shadow-sm">
      {/* Container with max width */}
      <div className="max-w-[1200px] mx-auto flex items-center justify-between h-16 px-6 md:px-12">
        {/* Left side - logo and wordmark */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <img 
              src="/samir-logo.png" 
              alt="samir.xyz logo" 
              className="h-8 w-auto"
            />
          </Link>
        </div>
        
        {/* Right side - navigation links */}
        <nav className="flex items-center gap-6">
          <Link 
            href="/profile/"
            className={`text-sm font-medium transition-colors ${
              pathname?.startsWith("/profile") 
                ? "text-purple-700 font-semibold" 
                : "text-gray-600 hover:text-purple-600"
            }`}
          >
            ABOUT
          </Link>
          <Link 
            href="/portfolio/"
            className={`text-sm font-medium transition-colors ${
              pathname?.startsWith("/portfolio") 
                ? "text-purple-700 font-semibold" 
                : "text-gray-600 hover:text-purple-600"
            }`}
          >
            PORTFOLIO
          </Link>
          <Link 
            href="/ventures/"
            className={`text-sm font-medium transition-colors ${
              pathname?.startsWith("/ventures") 
                ? "text-purple-700 font-semibold" 
                : "text-gray-600 hover:text-purple-600"
            }`}
          >
            VENTURES
          </Link>
        </nav>
      </div>
    </header>
  );
}