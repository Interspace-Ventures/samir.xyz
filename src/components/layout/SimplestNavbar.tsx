"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SimplestNavbar() {
  const pathname = usePathname();

  return (
    <header className="navbar-container">
      {/* Container with max width */}
      <div className="navbar-content">
        {/* Left side - logo and wordmark */}
        <div className="navbar-logo">
          <Link href="/" className="flex items-center no-underline">
            {/* Logo with gradient background */}
            <div className="logo-badge">
              <span className="logo-letter">S</span>
            </div>
            <span className="logo-text">samir.xyz</span>
            <img 
              src="/logos/solo-logo.png" 
              alt="Solo Logo" 
              className="ml-3 h-8 opacity-90"
            />
          </Link>
        </div>
        
        {/* Right side - navigation links */}
        <nav className="navbar-nav">
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
        </nav>
      </div>
    </header>
  );
}