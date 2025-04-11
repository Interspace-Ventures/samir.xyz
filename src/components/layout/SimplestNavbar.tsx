"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SimplestNavbar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 w-screen h-20 bg-[#5239cc] flex justify-center items-center z-[1000] shadow-md" style={{backgroundColor: '#5239cc'}}>
      {/* Container with max width */}
      <div className="max-w-[1200px] w-full h-full flex justify-between items-center px-6">
        {/* Left side - logo and wordmark */}
        <div className="flex items-center justify-start flex-shrink-0">
          <Link href="/" className="flex items-center no-underline">
            {/* Logo with gradient background */}
            <div className="bg-gradient-to-br from-[#4285f4] to-[#8c5ad7] w-12 h-12 flex items-center justify-center rounded-md mr-4 shadow-md">
              <span className="text-white text-2xl font-bold font-alexandria" style={{color: 'white'}}>S</span>
            </div>
            <span className="text-white text-2xl font-medium font-alexandria" style={{color: 'white'}}>samir.xyz</span>
          </Link>
        </div>
        
        {/* Right side - navigation links */}
        <nav className="flex items-center justify-end gap-8 flex-nowrap flex-shrink-0 ml-auto">
          <Link 
            href="/profile/"
            className={`text-white text-base uppercase tracking-wider font-alexandria no-underline hover:opacity-90 pb-1 ${
              pathname?.startsWith("/profile") ? "border-b-2 border-white font-semibold" : ""
            }`}
            style={{color: 'white'}}
          >
            ABOUT
          </Link>
          <Link 
            href="/portfolio/"
            className={`text-white text-base uppercase tracking-wider font-alexandria no-underline hover:opacity-90 pb-1 ${
              pathname?.startsWith("/portfolio") ? "border-b-2 border-white font-semibold" : ""
            }`}
            style={{color: 'white'}}
          >
            PORTFOLIO
          </Link>
          <Link 
            href="/ventures/"
            className={`text-white text-base uppercase tracking-wider font-alexandria no-underline hover:opacity-90 pb-1 ${
              pathname?.startsWith("/ventures") ? "border-b-2 border-white font-semibold" : ""
            }`}
            style={{color: 'white'}}
          >
            VENTURES
          </Link>
        </nav>
      </div>
    </header>
  );
}