"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PurpleNavbar() {
  const pathname = usePathname();
  
  return (
    <nav className="h-20 bg-[#5239cc] fixed top-0 left-0 w-screen z-50 shadow-md">
      <div className="max-w-[1200px] mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo and wordmark on the left */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center no-underline">
            {/* Logo with gradient background */}
            <div className="bg-gradient-to-br from-[#4285f4] to-[#8c5ad7] w-12 h-12 flex items-center justify-center rounded-md mr-4 shadow-md">
              <span className="text-white text-2xl font-bold font-alexandria">
                S
              </span>
            </div>
            
            {/* Wordmark */}
            <span className="text-white text-2xl font-medium font-alexandria">
              samir.xyz
            </span>
          </Link>
        </div>
        
        {/* Navigation links - right aligned */}
        <div className="flex items-center justify-end gap-8 flex-nowrap flex-shrink-0">
          <Link
            href="/profile/"
            className={`text-base uppercase tracking-wider text-white font-alexandria ${
              pathname.startsWith("/profile") ? 'border-b-2 border-white font-semibold' : 'font-normal'
            }`}
          >
            ABOUT
          </Link>
          <Link
            href="/portfolio/"
            className={`text-base uppercase tracking-wider text-white font-alexandria ${
              pathname.startsWith("/portfolio") ? 'border-b-2 border-white font-semibold' : 'font-normal'
            }`}
          >
            PORTFOLIO
          </Link>
          <Link
            href="/ventures/"
            className={`text-base uppercase tracking-wider text-white font-alexandria ${
              pathname.startsWith("/ventures") ? 'border-b-2 border-white font-semibold' : 'font-normal'
            }`}
          >
            VENTURES
          </Link>
        </div>
      </div>
    </nav>
  );
}