"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PurpleNavbar() {
  const pathname = usePathname();
  
  return (
    <nav className="h-20 bg-[#5239cc] fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="max-w-[1200px] mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo and wordmark on the left */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center no-underline">
            {/* Logo with gradient background */}
            <div className="bg-gradient-to-br from-[#4285f4] to-[#8c5ad7] w-12 h-12 flex items-center justify-center rounded-md mr-3 shadow-md">
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
        <div className="flex items-center justify-end">
          <Link
            href="/profile/"
            className={`ml-8 text-base uppercase tracking-wider text-white font-alexandria
              ${pathname.startsWith("/profile") ? 'font-bold underline' : 'font-normal no-underline'}`}
          >
            ABOUT
          </Link>
          <Link
            href="/portfolio/"
            className={`ml-8 text-base uppercase tracking-wider text-white font-alexandria
              ${pathname.startsWith("/portfolio") ? 'font-bold underline' : 'font-normal no-underline'}`}
          >
            PORTFOLIO
          </Link>
          <Link
            href="/ventures/"
            className={`ml-8 text-base uppercase tracking-wider text-white font-alexandria
              ${pathname.startsWith("/ventures") ? 'font-bold underline' : 'font-normal no-underline'}`}
          >
            VENTURES
          </Link>
        </div>
      </div>
    </nav>
  );
}