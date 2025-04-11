"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SimplestNavbar() {
  const pathname = usePathname();

  return (
    <header>
      {/* Container with max width */}
      <div className="navbar-container">
        {/* Left side - logo and wordmark */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center no-underline">
            {/* Logo with gradient background */}
            <div className="logo-container">
              <span className="logo-text">S</span>
            </div>
            <span className="wordmark">samir.xyz</span>
          </Link>
        </div>
        
        {/* Right side - navigation links */}
        <div className="navigation-links">
          <Link 
            href="/profile/"
            className={`nav-link ${pathname?.startsWith("/profile") ? "nav-link-active" : ""}`}
          >
            ABOUT
          </Link>
          <Link 
            href="/portfolio/"
            className={`nav-link ${pathname?.startsWith("/portfolio") ? "nav-link-active" : ""}`}
          >
            PORTFOLIO
          </Link>
          <Link 
            href="/ventures/"
            className={`nav-link ${pathname?.startsWith("/ventures") ? "nav-link-active" : ""}`}
          >
            VENTURES
          </Link>
        </div>
      </div>
    </header>
  );
}