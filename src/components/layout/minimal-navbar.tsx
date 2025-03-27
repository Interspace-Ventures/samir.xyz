"use client";

import Link from "next/link";
import Image from "next/image";
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
  
  // Set colors based on theme with deepest enhanced purple dark mode
  const colors: ThemeColors = {
    bg: isDark ? "#250755" : "white", // Deepest purple background for dark mode
    text: isDark ? "#f5f3ff" : "#333333", // Bright text for better contrast on dark purple
    border: isDark ? "#4c1d95" : "#e2e8f0", // Deeper purple border for dark mode
    muted: isDark ? "#c4b5fd" : "#4b5563", // Keeping the muted text visible
    accent: isDark ? "#7e22ce" : "#8b5cf6", // Deepest purple accent for dark mode
  };
  
  return (
    <div style={{
      position: "relative",
      padding: "16px",
      borderBottom: `1px solid ${isDark ? colors.accent : colors.border}`,
      background: isDark ? 
        `linear-gradient(to bottom, rgba(45, 8, 90, 0.98), ${colors.bg})` : 
        colors.bg,
      boxShadow: isDark ? 
        "0 4px 20px -8px rgba(70, 20, 130, 0.75), 0 0 12px rgba(123, 58, 237, 0.2)" : 
        "none",
      transition: "all 0.3s ease"
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
              fontWeight: isDark ? "700" : "bold",
              fontSize: "20px",
              color: isDark ? colors.text : colors.text,
              textDecoration: "none",
              textShadow: isDark ? "0 0 10px rgba(147, 51, 234, 0.6)" : "none",
              transition: "all 0.3s ease",
              position: "relative",
              letterSpacing: isDark ? "0.3px" : "normal"
            }}
          >
            <span 
              style={{ 
                backgroundImage: isDark ? "linear-gradient(90deg, #f5f3ff, #d8b4fe)" : "none",
                WebkitBackgroundClip: isDark ? "text" : "none",
                backgroundClip: isDark ? "text" : "none",
                color: isDark ? "transparent" : colors.text,
                fontWeight: isDark ? "800" : "bold"
              }}
            >
              Hey - I&apos;m Samir
            </span>
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
                fontWeight: isDark ? "600" : "500",
                padding: "0 8px",
                position: "relative",
                transition: "all 0.3s ease",
                textShadow: isDark && pathname.startsWith("/profile") ? "0 0 8px rgba(147, 51, 234, 0.7)" : "none",
              }}
            >
              About
              {pathname.startsWith("/profile") && (
                <span style={{
                  position: "absolute",
                  bottom: "-8px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "24px",
                  height: "3px",
                  backgroundColor: colors.accent,
                  borderRadius: "3px",
                  boxShadow: isDark ? "0 0 8px rgba(147, 51, 234, 0.8)" : "none",
                }}></span>
              )}
            </Link>
            <Link 
              href="/portfolio/" 
              style={{
                color: pathname.startsWith("/portfolio") ? colors.accent : colors.muted,
                textDecoration: "none",
                fontWeight: isDark ? "600" : "500",
                padding: "0 8px",
                position: "relative",
                transition: "all 0.3s ease",
                textShadow: isDark && pathname.startsWith("/portfolio") ? "0 0 8px rgba(147, 51, 234, 0.7)" : "none",
              }}
            >
              Portfolio
              {pathname.startsWith("/portfolio") && (
                <span style={{
                  position: "absolute",
                  bottom: "-8px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "24px",
                  height: "3px",
                  backgroundColor: colors.accent,
                  borderRadius: "3px",
                  boxShadow: isDark ? "0 0 8px rgba(147, 51, 234, 0.8)" : "none",
                }}></span>
              )}
            </Link>
            <Link 
              href="/ventures/" 
              style={{
                color: pathname.startsWith("/ventures") ? colors.accent : colors.muted,
                textDecoration: "none",
                fontWeight: isDark ? "600" : "500",
                padding: "0 8px",
                position: "relative",
                transition: "all 0.3s ease",
                textShadow: isDark && pathname.startsWith("/ventures") ? "0 0 8px rgba(147, 51, 234, 0.7)" : "none",
              }}
            >
              Ventures
              {pathname.startsWith("/ventures") && (
                <span style={{
                  position: "absolute",
                  bottom: "-8px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "24px",
                  height: "3px",
                  backgroundColor: colors.accent,
                  borderRadius: "3px",
                  boxShadow: isDark ? "0 0 8px rgba(147, 51, 234, 0.8)" : "none",
                }}></span>
              )}
            </Link>
          </div>
          
          {/* Theme toggle button */}
          <ThemeToggle />
          
          {/* Profile Picture with deeper purple glow in dark mode */}
          <div style={{ 
            width: "36px", 
            height: "36px", 
            borderRadius: "50%", 
            overflow: "hidden",
            position: "relative",
            border: `2px solid ${colors.accent}`,
            boxShadow: isDark ? `0 0 12px rgba(147, 51, 234, 0.8)` : "none",
            transition: "all 0.3s ease"
          }}>
            <div style={{
              width: '100%',
              height: '100%',
              background: isDark ? 
                `linear-gradient(135deg, ${colors.accent}, #6d28d9)` : 
                colors.accent,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              fontWeight: "bold",
              fontSize: "16px",
              textShadow: isDark ? "0 0 4px rgba(255, 255, 255, 0.6)" : "none"
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
          
          {/* Profile Picture in mobile view - with matching deeper purple glow */}
          <div style={{ 
            width: "32px", 
            height: "32px", 
            borderRadius: "50%", 
            overflow: "hidden",
            position: "relative",
            border: `2px solid ${colors.accent}`,
            boxShadow: isDark ? `0 0 12px rgba(147, 51, 234, 0.8)` : "none",
            transition: "all 0.3s ease"
          }}>
            <div style={{
              width: '100%',
              height: '100%',
              background: isDark ? 
                `linear-gradient(135deg, ${colors.accent}, #6d28d9)` : 
                colors.accent,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              fontWeight: "bold",
              fontSize: "16px",
              textShadow: isDark ? "0 0 4px rgba(255, 255, 255, 0.6)" : "none"
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
          background: isDark ? 
            `linear-gradient(to bottom, ${colors.bg}, rgba(30, 5, 65, 1))` : 
            colors.bg,
          padding: "20px",
          borderTop: `1px solid ${isDark ? colors.accent : colors.border}`,
          boxShadow: isDark ? 
            "0 5px 20px -2px rgba(50, 10, 100, 0.9), 0 0 12px rgba(123, 58, 237, 0.3)" : 
            "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          zIndex: 50,
          transition: "all 0.3s ease",
          backdropFilter: isDark ? "blur(5px)" : "none"
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
            <Link 
              href="/profile/" 
              style={{
                color: pathname.startsWith("/profile") ? colors.accent : colors.muted,
                textDecoration: "none",
                fontWeight: isDark ? "600" : "500",
                padding: "8px 0",
                fontSize: "18px",
                transition: "all 0.3s ease",
                textShadow: isDark && pathname.startsWith("/profile") ? "0 0 8px rgba(147, 51, 234, 0.7)" : "none",
                borderLeft: isDark && pathname.startsWith("/profile") ? `3px solid ${colors.accent}` : "none",
                paddingLeft: isDark && pathname.startsWith("/profile") ? "10px" : "0",
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
                fontWeight: isDark ? "600" : "500",
                padding: "8px 0",
                fontSize: "18px",
                transition: "all 0.3s ease",
                textShadow: isDark && pathname.startsWith("/portfolio") ? "0 0 8px rgba(147, 51, 234, 0.7)" : "none",
                borderLeft: isDark && pathname.startsWith("/portfolio") ? `3px solid ${colors.accent}` : "none",
                paddingLeft: isDark && pathname.startsWith("/portfolio") ? "10px" : "0",
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
                fontWeight: isDark ? "600" : "500",
                padding: "8px 0",
                fontSize: "18px",
                transition: "all 0.3s ease",
                textShadow: isDark && pathname.startsWith("/ventures") ? "0 0 8px rgba(147, 51, 234, 0.7)" : "none",
                borderLeft: isDark && pathname.startsWith("/ventures") ? `3px solid ${colors.accent}` : "none",
                paddingLeft: isDark && pathname.startsWith("/ventures") ? "10px" : "0",
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