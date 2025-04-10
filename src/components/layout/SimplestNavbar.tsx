"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SimplestNavbar() {
  const pathname = usePathname();

  // Use inline styles without any spacers or extra divs
  return (
    <header
      style={{
        position: "fixed", /* Use fixed positioning to ensure compatibility */
        top: 0,
        left: 0,
        width: "100%",
        height: "80px",
        backgroundColor: "#5239cc",
        display: "flex",
        justifyContent: "center",
        zIndex: 1000,
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)"
      }}
    >
      {/* Container with max width */}
      <div 
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          maxWidth: "1200px",
          padding: "0 32px"
        }}
      >
        {/* Left side - logo and wordmark */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
            <div 
              style={{
                background: "linear-gradient(135deg, #4285f4 0%, #8c5ad7 100%)",
                width: "48px",
                height: "48px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "8px",
                marginRight: "16px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)"
              }}
            >
              <span 
                style={{
                  color: "white",
                  fontSize: "24px",
                  fontWeight: "bold",
                  fontFamily: "Alexandria, sans-serif"
                }}
              >
                S
              </span>
            </div>
            <span 
              style={{
                color: "white",
                fontSize: "24px",
                fontWeight: 500,
                fontFamily: "Alexandria, sans-serif"
              }}
            >
              samir.xyz
            </span>
          </Link>
        </div>
        
        {/* Right side - navigation links */}
        <div style={{ display: "flex", gap: "32px" }}>
          <Link 
            href="/profile/"
            style={{
              color: "white",
              fontSize: "16px",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              fontFamily: "Alexandria, sans-serif",
              textDecoration: "none",
              ...(pathname?.startsWith("/profile") && {
                borderBottom: "2px solid white",
                fontWeight: 600
              })
            }}
          >
            ABOUT
          </Link>
          <Link 
            href="/portfolio/"
            style={{
              color: "white",
              fontSize: "16px",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              fontFamily: "Alexandria, sans-serif",
              textDecoration: "none",
              ...(pathname?.startsWith("/portfolio") && {
                borderBottom: "2px solid white",
                fontWeight: 600
              })
            }}
          >
            PORTFOLIO
          </Link>
          <Link 
            href="/ventures/"
            style={{
              color: "white",
              fontSize: "16px",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              fontFamily: "Alexandria, sans-serif",
              textDecoration: "none",
              ...(pathname?.startsWith("/ventures") && {
                borderBottom: "2px solid white",
                fontWeight: 600
              })
            }}
          >
            VENTURES
          </Link>
        </div>
      </div>
    </header>
  );
}