"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SimplestNavbar() {
  const pathname = usePathname();

  // Use Tailwind classes instead of inline styles
  return (
    <header
      className="fixed top-0 left-0 w-full h-20 bg-[#5239cc] flex justify-center z-[1000] shadow-md"
    >
      {/* Container with max width */}
      <div 
        className="flex justify-between items-center w-full max-w-[1200px] px-8"
      >
        {/* Left side - logo and wordmark */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center no-underline">
            <div 
              className="bg-gradient-to-br from-[#4285f4] to-[#8c5ad7] w-12 h-12 flex items-center justify-center rounded-md mr-4 shadow-sm"
            >
              <span 
                className="text-white text-2xl font-bold font-alexandria"
              >
                S
              </span>
            </div>
            <span 
              className="text-white text-2xl font-medium font-alexandria"
            >
              samir.xyz
            </span>
          </Link>
        </div>
        
        {/* Right side - navigation links */}
        <div className="flex gap-8">
          <Link 
            href="/profile/"
            className={`text-white text-base uppercase tracking-wider font-alexandria no-underline ${
              pathname?.startsWith("/profile") ? "border-b-2 border-white font-semibold" : ""
            }`}
          >
            ABOUT
          </Link>
          <Link 
            href="/portfolio/"
            className={`text-white text-base uppercase tracking-wider font-alexandria no-underline ${
              pathname?.startsWith("/portfolio") ? "border-b-2 border-white font-semibold" : ""
            }`}
          >
            PORTFOLIO
          </Link>
          <Link 
            href="/ventures/"
            className={`text-white text-base uppercase tracking-wider font-alexandria no-underline ${
              pathname?.startsWith("/ventures") ? "border-b-2 border-white font-semibold" : ""
            }`}
          >
            VENTURES
          </Link>
        </div>
      </div>
    </header>
  );
}