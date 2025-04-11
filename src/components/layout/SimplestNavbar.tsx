"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SimplestNavbar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 w-screen h-20 bg-[#5239cc] flex justify-center z-[1000] shadow-md">
      {/* Container with max width */}
      <div className="max-w-[1200px] w-full h-full flex justify-between items-center px-6">
        {/* Left side - logo and wordmark */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center no-underline">
            {/* Logo with gradient background */}
            <div className="bg-gradient-to-br from-[#4285f4] to-[#8c5ad7] w-12 h-12 flex items-center justify-center rounded-md mr-4 shadow-md">
              <span className="text-white text-2xl font-bold font-alexandria">S</span>
            </div>
            <span className="text-white text-2xl font-medium font-alexandria">samir.xyz</span>
          </Link>
        </div>
        
        {/* Right side - navigation links */}
        <div className="flex items-center gap-8 flex-nowrap">
          <Link 
            href="/profile/"
            className={`text-white text-base uppercase tracking-wider font-alexandria no-underline hover:opacity-90 ${
              pathname?.startsWith("/profile") ? "border-b-2 border-white font-semibold" : ""
            }`}
          >
            ABOUT
          </Link>
          <Link 
            href="/portfolio/"
            className={`text-white text-base uppercase tracking-wider font-alexandria no-underline hover:opacity-90 ${
              pathname?.startsWith("/portfolio") ? "border-b-2 border-white font-semibold" : ""
            }`}
          >
            PORTFOLIO
          </Link>
          <Link 
            href="/ventures/"
            className={`text-white text-base uppercase tracking-wider font-alexandria no-underline hover:opacity-90 ${
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