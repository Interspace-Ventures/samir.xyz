"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function UltraSimpleNavbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  // Check for system dark mode preference and localStorage theme setting
  useEffect(() => {
    // Check if document is available (client-side only)
    if (typeof window !== 'undefined') {
      // Check localStorage for theme setting
      const savedTheme = localStorage.getItem('theme');
      
      if (savedTheme) {
        setIsDarkMode(savedTheme === 'dark');
      } else {
        // Check system preference if no saved theme
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDarkMode(prefersDark);
      }
      
      // Set up listener for theme changes
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (
            mutation.type === 'attributes' &&
            mutation.attributeName === 'class'
          ) {
            const htmlElement = document.documentElement;
            setIsDarkMode(htmlElement.classList.contains('dark'));
          }
        });
      });
      
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class'],
      });
      
      return () => observer.disconnect();
    }
  }, []);
  
  // Colors based on dark/light mode
  const colors = {
    // For dark mode, we use the new purple theme
    bg: isDarkMode ? "#2c104a" : "#f3f4f6", // Dark purple background
    text: isDarkMode ? "#ffffff" : "#111827",
    muted: isDarkMode ? "#a78bda" : "#6b7280", // Lighter purple for muted text
    border: isDarkMode ? "#4c1d95" : "#e5e7eb", // Purple border
    menuBg: isDarkMode ? "#3b1464" : "#ffffff", // Slightly lighter purple for menus
    shadow: isDarkMode ? "rgba(76, 29, 149, 0.5)" : "rgba(0, 0, 0, 0.1)", // Purple shadow
    accent: isDarkMode ? "#a855f7" : "#9333ea", // Accent color for highlights
  };
  
  return (
    <nav style={{
      backgroundColor: colors.bg,
      color: colors.text,
      padding: "16px",
      borderBottom: `1px solid ${colors.border}`,
      transition: "background-color 0.3s, color 0.3s, border-color 0.3s",
    }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 16px"
      }}>
        {/* Left side - Logo/Name */}
        <div>
          <Link href="/" style={{ 
            color: colors.text, 
            textDecoration: "none",
            fontWeight: 600,
            fontSize: "18px",
          }}>
            Hey - I&apos;m Samir
          </Link>
        </div>
        
        {/* Right side - Navigation links (desktop) */}
        <div style={{ 
          display: "flex", 
          gap: "32px" // Increased gap for better spacing between links
        }} className="desktop-nav">
          <Link 
            href="/profile/" 
            style={{ 
              color: pathname.startsWith("/profile") ? colors.text : colors.muted,
              textDecoration: "none",
              fontWeight: pathname.startsWith("/profile") ? 600 : 400,
              position: "relative",
              paddingBottom: "2px",
            }}
          >
            About
            {pathname.startsWith("/profile") && (
              <span style={{
                position: "absolute",
                bottom: "-4px",
                left: "0",
                width: "100%",
                height: "2px",
                backgroundColor: colors.accent,
                transition: "all 0.2s ease",
                borderRadius: "1px"
              }}></span>
            )}
          </Link>
          <Link 
            href="/portfolio/" 
            style={{ 
              color: pathname.startsWith("/portfolio") ? colors.text : colors.muted,
              textDecoration: "none",
              fontWeight: pathname.startsWith("/portfolio") ? 600 : 400,
              position: "relative",
              paddingBottom: "2px",
            }}
          >
            Portfolio
            {pathname.startsWith("/portfolio") && (
              <span style={{
                position: "absolute",
                bottom: "-4px",
                left: "0",
                width: "100%",
                height: "2px",
                backgroundColor: colors.accent,
                transition: "all 0.2s ease",
                borderRadius: "1px"
              }}></span>
            )}
          </Link>
          <Link 
            href="/ventures/" 
            style={{ 
              color: pathname.startsWith("/ventures") ? colors.text : colors.muted,
              textDecoration: "none",
              fontWeight: pathname.startsWith("/ventures") ? 600 : 400,
              position: "relative",
              paddingBottom: "2px",
            }}
          >
            Ventures
            {pathname.startsWith("/ventures") && (
              <span style={{
                position: "absolute",
                bottom: "-4px",
                left: "0",
                width: "100%",
                height: "2px",
                backgroundColor: colors.accent,
                transition: "all 0.2s ease",
                borderRadius: "1px"
              }}></span>
            )}
          </Link>
        </div>
        
        {/* Mobile menu button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{
            background: "transparent",
            border: "none",
            color: colors.text,
            padding: "8px",
            cursor: "pointer",
            display: "none",
            alignItems: "center",
          }}
          className="mobile-menu-button"
          aria-label={isMenuOpen ? "Close main menu" : "Open main menu"}
        >
          <span style={{ position: "absolute", width: "1px", height: "1px", padding: "0", margin: "-1px", overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: "0" }}>
            {isMenuOpen ? "Close main menu" : "Open main menu"}
          </span>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
            <div style={{ 
              height: "2px", 
              width: "20px", 
              backgroundColor: colors.text, 
              marginBottom: "4px",
              transition: "transform 0.3s, opacity 0.3s",
              transform: isMenuOpen ? "translateY(6px) rotate(45deg)" : "none"
            }}></div>
            <div style={{ 
              height: "2px", 
              width: "20px", 
              backgroundColor: colors.text, 
              marginBottom: "4px",
              transition: "opacity 0.3s",
              opacity: isMenuOpen ? 0 : 1
            }}></div>
            <div style={{ 
              height: "2px", 
              width: "20px", 
              backgroundColor: colors.text,
              transition: "transform 0.3s",
              transform: isMenuOpen ? "translateY(-6px) rotate(-45deg)" : "none"
            }}></div>
          </div>
        </button>
      </div>
      
      {/* Mobile menu dropdown */}
      <div
        style={{
          position: "absolute",
          backgroundColor: colors.menuBg,
          width: "100%",
          left: 0,
          top: isMenuOpen ? "56px" : "-100%", // This makes it animate in/out
          padding: "16px",
          boxShadow: isMenuOpen ? `0 4px 6px -1px ${colors.shadow}` : "none",
          zIndex: 50,
          transition: "top 0.3s ease-in-out",
          borderBottom: isMenuOpen ? `1px solid ${colors.border}` : "none",
          opacity: isMenuOpen ? 1 : 0,
        }}
        className="mobile-menu"
      >
        <div style={{ 
          display: "flex", 
          flexDirection: "column", 
          gap: "16px",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "8px 16px"
        }}>
          <Link 
            href="/profile/" 
            style={{ 
              color: pathname.startsWith("/profile") ? colors.text : colors.muted,
              textDecoration: "none",
              fontWeight: pathname.startsWith("/profile") ? 600 : 400,
              borderLeft: pathname.startsWith("/profile") ? `2px solid ${colors.accent}` : "none",
              paddingLeft: pathname.startsWith("/profile") ? "8px" : "0",
            }}
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          <Link 
            href="/portfolio/" 
            style={{ 
              color: pathname.startsWith("/portfolio") ? colors.text : colors.muted,
              textDecoration: "none",
              fontWeight: pathname.startsWith("/portfolio") ? 600 : 400,
              borderLeft: pathname.startsWith("/portfolio") ? `2px solid ${colors.accent}` : "none",
              paddingLeft: pathname.startsWith("/portfolio") ? "8px" : "0",
            }}
            onClick={() => setIsMenuOpen(false)}
          >
            Portfolio
          </Link>
          <Link 
            href="/ventures/" 
            style={{ 
              color: pathname.startsWith("/ventures") ? colors.text : colors.muted,
              textDecoration: "none",
              fontWeight: pathname.startsWith("/ventures") ? 600 : 400,
              borderLeft: pathname.startsWith("/ventures") ? `2px solid ${colors.accent}` : "none",
              paddingLeft: pathname.startsWith("/ventures") ? "8px" : "0",
            }}
            onClick={() => setIsMenuOpen(false)}
          >
            Ventures
          </Link>
        </div>
      </div>
      
      <style jsx global>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-button {
            display: flex !important;
          }
        }
        
        @media (min-width: 769px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-menu-button {
            display: none !important;
          }
          .mobile-menu {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  );
}