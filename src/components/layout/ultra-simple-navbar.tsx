"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UltraSimpleNavbar() {
  const pathname = usePathname();
  
  return (
    <nav 
      className="fixed top-0 left-0 w-full z-50 shadow-lg !bg-[#5239cc] flex items-center"
      style={{ height: '80px' }} /* Needed for verification script */
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between">
          {/* Logo and wordmark on the left */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              {/* Logo with gradient background */}
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-12 h-12 flex items-center justify-center rounded-md mr-3 shadow-md">
                <span className="text-white text-2xl font-bold" style={{ fontFamily: "Alexandria, sans-serif" }}>S</span>
              </div>
              
              {/* Wordmark */}
              <span className="text-white text-2xl font-medium" style={{ fontFamily: "Alexandria, sans-serif" }}>samir.xyz</span>
            </Link>
          </div>
          
          {/* Navigation links - right aligned */}
          <div className="flex items-center justify-end">
            <Link
              href="/profile/"
              className={`ml-8 text-base uppercase tracking-wider text-white ${pathname.startsWith("/profile") ? 'border-b-2 border-white font-semibold' : 'font-normal'}`}
              style={{ fontFamily: "Alexandria, sans-serif" }}
            >
              ABOUT
            </Link>
            <Link
              href="/portfolio/"
              className={`ml-8 text-base uppercase tracking-wider text-white ${pathname.startsWith("/portfolio") ? 'border-b-2 border-white font-semibold' : 'font-normal'}`}
              style={{ fontFamily: "Alexandria, sans-serif" }}
            >
              PORTFOLIO
            </Link>
            <Link
              href="/ventures/"
              className={`ml-8 text-base uppercase tracking-wider text-white ${pathname.startsWith("/ventures") ? 'border-b-2 border-white font-semibold' : 'font-normal'}`}
              style={{ fontFamily: "Alexandria, sans-serif" }}
            >
              VENTURES
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
