"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { ThemeToggle } from "./theme-toggle";
import "./minimal-navbar.css";

interface ThemeColors {
  bg: string;
  text: string;
  border: string;
  muted: string;
  accent: string;
}

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
  const colors: ThemeColors = {
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
                position: "relative",
                transition: "color 0.3s"
              }}
            >
              About
              {pathname.startsWith("/profile") && (
                <span style={{
                  position: "absolute",
                  bottom: "-8px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "20px",
                  height: "3px",
                  backgroundColor: colors.accent,
                  borderRadius: "2px"
                }}></span>
              )}
            </Link>
            <Link 
              href="/portfolio/" 
              style={{
                color: pathname.startsWith("/portfolio") ? colors.accent : colors.muted,
                textDecoration: "none",
                fontWeight: "500",
                padding: "0 8px",
                position: "relative",
                transition: "color 0.3s"
              }}
            >
              Portfolio
              {pathname.startsWith("/portfolio") && (
                <span style={{
                  position: "absolute",
                  bottom: "-8px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "20px",
                  height: "3px",
                  backgroundColor: colors.accent,
                  borderRadius: "2px"
                }}></span>
              )}
            </Link>
            <Link 
              href="/ventures/" 
              style={{
                color: pathname.startsWith("/ventures") ? colors.accent : colors.muted,
                textDecoration: "none",
                fontWeight: "500",
                padding: "0 8px",
                position: "relative",
                transition: "color 0.3s"
              }}
            >
              Ventures
              {pathname.startsWith("/ventures") && (
                <span style={{
                  position: "absolute",
                  bottom: "-8px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "20px",
                  height: "3px",
                  backgroundColor: colors.accent,
                  borderRadius: "2px"
                }}></span>
              )}
            </Link>
          </div>
          
          {/* Theme toggle button */}
          <ThemeToggle />
          
          {/* Profile Picture */}
          <div style={{ 
            width: "36px", 
            height: "36px", 
            borderRadius: "50%", 
            overflow: "hidden",
            position: "relative",
            border: `2px solid ${colors.border}`
          }}>
            <div style={{
              width: '100%',
              height: '100%',
              backgroundColor: colors.accent,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              fontWeight: "bold",
              fontSize: "16px"
            }}>
              S
            </div>
          </div>
        </div>
        
        {/* Mobile menu button - visible only on mobile with CSS */}
        <div className="mobile-nav" style={{ 
          display: "none", 
          alignItems: "center", 
          gap: "16px"
        }}>
          {/* Theme toggle in mobile view */}
          <ThemeToggle />
          
          {/* Profile Picture in mobile view */}
          <div style={{ 
            width: "32px", 
            height: "32px", 
            borderRadius: "50%", 
            overflow: "hidden",
            position: "relative",
            border: `2px solid ${colors.border}`
          }}>
            <div style={{
              width: '100%',
              height: '100%',
              backgroundColor: colors.accent,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              fontWeight: "bold",
              fontSize: "16px"
            }}>
              S
            </div>
          </div>
          
          {/* Menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              color: colors.text,
              fontSize: "16px",
              padding: "8px",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: "24px" }}>
              menu
            </span>
          </button>
        </div>
      </div>
      
      {/* Mobile menu - display when button is clicked */}
      {isMenuOpen && (
        <div className="mobile-menu" style={{
          position: "absolute",
          top: "100%",
          left: 0,
          right: 0,
          backgroundColor: colors.bg,
          padding: "20px",
          borderTop: `1px solid ${colors.border}`,
          boxShadow: isDark ? "0 4px 6px -1px rgba(0, 0, 0, 0.4)" : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          zIndex: 50,
          transition: "background-color 0.3s, border-color 0.3s"
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
            <Link 
              href="/profile/" 
              style={{
                color: pathname.startsWith("/profile") ? colors.accent : colors.muted,
                textDecoration: "none",
                fontWeight: "500",
                padding: "8px 0",
                fontSize: "18px",
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
                padding: "8px 0",
                fontSize: "18px",
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
                padding: "8px 0",
                fontSize: "18px",
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