"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function UltraSimpleNavbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <nav style={{
      backgroundColor: "#111827",
      color: "white",
      padding: "16px"
    }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        {/* Left side - Logo/Name */}
        <div>
          <Link href="/" style={{ color: "white", textDecoration: "none" }}>
            Hey - I&apos;m Samir
          </Link>
        </div>
        
        {/* Right side - Navigation links (desktop) */}
        <div style={{ 
          display: "flex", 
          gap: "20px"
        }} className="desktop-nav">
          <Link 
            href="/profile/" 
            style={{ 
              color: pathname.startsWith("/profile") ? "#ffffff" : "#9ca3af",
              textDecoration: "none" 
            }}
          >
            About
          </Link>
          <Link 
            href="/portfolio/" 
            style={{ 
              color: pathname.startsWith("/portfolio") ? "#ffffff" : "#9ca3af",
              textDecoration: "none" 
            }}
          >
            Portfolio
          </Link>
          <Link 
            href="/ventures/" 
            style={{ 
              color: pathname.startsWith("/ventures") ? "#ffffff" : "#9ca3af",
              textDecoration: "none" 
            }}
          >
            Ventures
          </Link>
        </div>
        
        {/* Mobile menu button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{
            background: "transparent",
            border: "none",
            color: "white",
            padding: "8px",
            cursor: "pointer",
            display: "none"
          }}
          className="mobile-menu-button"
          aria-label="Open main menu"
        >
          Open main menu
          <div style={{ marginTop: "4px" }}>
            <div style={{ height: "2px", width: "20px", backgroundColor: "white", marginBottom: "4px" }}></div>
            <div style={{ height: "2px", width: "20px", backgroundColor: "white", marginBottom: "4px" }}></div>
            <div style={{ height: "2px", width: "20px", backgroundColor: "white" }}></div>
          </div>
        </button>
      </div>
      
      {/* Mobile menu dropdown */}
      {isMenuOpen && (
        <div style={{
          position: "absolute",
          backgroundColor: "#374151",
          width: "100%",
          left: 0,
          padding: "16px",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          zIndex: 50
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <Link 
              href="/profile/" 
              style={{ color: "white", textDecoration: "none" }}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/portfolio/" 
              style={{ color: "white", textDecoration: "none" }}
              onClick={() => setIsMenuOpen(false)}
            >
              Portfolio
            </Link>
            <Link 
              href="/ventures/" 
              style={{ color: "white", textDecoration: "none" }}
              onClick={() => setIsMenuOpen(false)}
            >
              Ventures
            </Link>
          </div>
        </div>
      )}
      
      <style jsx global>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-button {
            display: flex !important;
            flex-direction: column;
            align-items: flex-end;
          }
        }
        
        @media (min-width: 769px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-menu-button {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  );
}