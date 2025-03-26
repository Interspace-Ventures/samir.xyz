"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { ThemeToggle } from "./theme-toggle";
import "./minimal-navbar.css";

export default function MinimalNavbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const isDark = mounted && theme === "dark";
  
  // Set colors based on theme
  const colors = {
    bg: isDark ? "#0f172a" : "white",
    text: isDark ? "#f1f5f9" : "#333333",
    border: isDark ? "#1e293b" : "#e2e8f0",
    muted: isDark ? "#94a3b8" : "#4b5563",
    accent: "#9333ea", // Purple accent color for both themes
  };
  
  return (
    <div style={{
      position: "relative",
      padding: "16px",
      borderBottom: `1px solid ${colors.border}`,
      backgroundColor: colors.bg,
      transition: "background-color 0.3s, color 0.3s, border-color 0.3s"
    }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        maxWidth: "1200px",
        margin: "0 auto",
        width: "100%"
      }}>
        {/* Logo */}
        <div>
          <a 
            href="/" 
            style={{
              fontWeight: "bold",
              fontSize: "20px",
              color: colors.text,
              textDecoration: "none",
              transition: "color 0.3s"
            }}
          >
            Hey - I&apos;m Samir
          </a>
        </div>
        
        {/* Desktop Links - hidden on mobile with media query */}
        <div className="desktop-nav" style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: "16px"
        }}>
          <div style={{ display: "flex", gap: "32px" }}>
            <Link 
              href="/profile/" 
              style={{
                color: pathname.startsWith("/profile") ? colors.accent : colors.muted,
                textDecoration: "none",
                fontWeight: "500",
                padding: "0 8px",
                transition: "color 0.3s"
              }}
            >
              About
            </Link>
            <Link 
              href="/portfolio/" 
              style={{
                color: pathname.startsWith("/portfolio") ? colors.accent : colors.muted,
                textDecoration: "none",
                fontWeight: "500",
                padding: "0 8px",
                transition: "color 0.3s"
              }}
            >
              Portfolio
            </Link>
            <Link 
              href="/ventures/" 
              style={{
                color: pathname.startsWith("/ventures") ? colors.accent : colors.muted,
                textDecoration: "none",
                fontWeight: "500",
                padding: "0 8px",
                transition: "color 0.3s"
              }}
            >
              Ventures
            </Link>
          </div>
          
          {/* Theme toggle button */}
          <ThemeToggle />
        </div>
        
        {/* Mobile menu button - visible only on mobile with CSS */}
        <div className="mobile-nav" style={{ 
          display: "none"
        }}>
          <ThemeToggle />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              color: colors.text,
              fontSize: "16px",
              padding: "8px 12px",
              borderRadius: "4px",
              border: `1px solid ${colors.border}`
            }}
          >
            Menu
          </button>
        </div>
      </div>
      
      {/* Mobile menu - display when button is clicked */}
      {isMenuOpen && (
        <div style={{
          position: "absolute",
          top: "100%",
          left: 0,
          right: 0,
          backgroundColor: colors.bg,
          padding: "16px",
          borderTop: `1px solid ${colors.border}`,
          zIndex: 50,
          transition: "background-color 0.3s, border-color 0.3s"
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <Link 
              href="/profile/" 
              style={{
                color: pathname.startsWith("/profile") ? colors.accent : colors.muted,
                textDecoration: "none",
                fontWeight: "500",
                transition: "color 0.3s"
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/portfolio/" 
              style={{
                color: pathname.startsWith("/portfolio") ? colors.accent : colors.muted,
                textDecoration: "none",
                fontWeight: "500",
                transition: "color 0.3s"
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              Portfolio
            </Link>
            <Link 
              href="/ventures/" 
              style={{
                color: pathname.startsWith("/ventures") ? colors.accent : colors.muted,
                textDecoration: "none",
                fontWeight: "500",
                transition: "color 0.3s"
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              Ventures
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}