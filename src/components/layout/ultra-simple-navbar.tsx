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
    // For dark mode, we use the enhanced purple theme with more vibrant colors
    bg: isDarkMode ? "#2c0b5a" : "#f3f4f6", // Deeper, more vibrant dark purple background
    text: isDarkMode ? "#ffffff" : "#111827",
    muted: isDarkMode ? "#b69df8" : "#6b7280", // Brighter purple for muted text
    border: isDarkMode ? "#5f25bf" : "#e5e7eb", // More visible purple border
    menuBg: isDarkMode ? "#3b0d82" : "#ffffff", // More vibrant purple for menus
    shadow: isDarkMode ? "rgba(108, 43, 217, 0.6)" : "rgba(0, 0, 0, 0.1)", // Brighter purple shadow
    accent: isDarkMode ? "#c084fc" : "#9333ea", // Brighter accent color for highlights
    glow: isDarkMode ? "0 0 15px rgba(139, 92, 246, 0.3)" : "none", // Purple glow for dark mode
  };
  
  return (
    <nav style={{
      backgroundColor: colors.bg,
      color: colors.text,
      padding: "16px",
      borderBottom: `1px solid ${colors.border}`,
      boxShadow: isDarkMode ? colors.glow : "none", // Add subtle purple glow in dark mode
      transition: "background-color 0.3s, color 0.3s, border-color 0.3s, box-shadow 0.3s",
      position: "relative",
      zIndex: 50, // Ensure navbar is above other content
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
            fontFamily: "Inter, sans-serif", // Ensure Inter font
          }}>
            Hey - I&apos;m Samir
          </Link>
        </div>
        
        {/* Right side - Navigation links (desktop) */}
        <div style={{ 
          display: "flex", 
          gap: "min(32px, 8vw)", // Responsive gap that gets smaller as viewport narrows
          fontFamily: "Inter, sans-serif", // Ensure Inter font
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
                height: "3px",
                background: "linear-gradient(90deg, #8b5cf6, #c084fc)",
                boxShadow: isDarkMode ? "0 0 8px rgba(192, 132, 252, 0.7)" : "none", // Glow effect
                transition: "all 0.2s ease",
                borderRadius: "2px"
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
                height: "3px",
                background: "linear-gradient(90deg, #8b5cf6, #c084fc)",
                boxShadow: isDarkMode ? "0 0 8px rgba(192, 132, 252, 0.7)" : "none", // Glow effect
                transition: "all 0.2s ease",
                borderRadius: "2px"
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
                height: "3px",
                background: "linear-gradient(90deg, #8b5cf6, #c084fc)",
                boxShadow: isDarkMode ? "0 0 8px rgba(192, 132, 252, 0.7)" : "none", // Glow effect
                transition: "all 0.2s ease",
                borderRadius: "2px"
              }}></span>
            )}
          </Link>
        </div>
        
        {/* Mobile menu button - Hidden by default on larger screens */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{
            background: "transparent",
            border: "none",
            color: colors.text,
            padding: "8px",
            cursor: "pointer",
            display: "none", // Hidden by default, controlled by media query
            alignItems: "center",
            fontFamily: "Inter, sans-serif", // Ensure Inter font
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
      
      {/* Mobile menu dropdown - Fixed visibility issues */}
      <div
        style={{
          position: "absolute",
          backgroundColor: colors.menuBg,
          width: "100%",
          left: 0,
          top: isMenuOpen ? "56px" : "-300px", // Changed from -100% to a fixed value
          padding: "16px",
          boxShadow: isMenuOpen ? `0 4px 6px -1px ${colors.shadow}` : "none",
          zIndex: 100, // Increased z-index
          transition: "top 0.3s ease-in-out",
          borderBottom: isMenuOpen ? `1px solid ${colors.border}` : "none",
          opacity: isMenuOpen ? 1 : 0,
          visibility: isMenuOpen ? "visible" : "hidden", // Added visibility control
          fontFamily: "Inter, sans-serif", // Ensure Inter font
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
              borderLeft: pathname.startsWith("/profile") ? `3px solid` : "none",
              backgroundImage: pathname.startsWith("/profile") ? `linear-gradient(0deg, #8b5cf6, #c084fc)` : "none",
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
              borderLeft: pathname.startsWith("/portfolio") ? `3px solid` : "none",
              backgroundImage: pathname.startsWith("/portfolio") ? `linear-gradient(0deg, #8b5cf6, #c084fc)` : "none",
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
              borderLeft: pathname.startsWith("/ventures") ? `3px solid` : "none",
              backgroundImage: pathname.startsWith("/ventures") ? `linear-gradient(0deg, #8b5cf6, #c084fc)` : "none",
              paddingLeft: pathname.startsWith("/ventures") ? "8px" : "0",
            }}
            onClick={() => setIsMenuOpen(false)}
          >
            Ventures
          </Link>
        </div>
      </div>
      
      <style jsx global>{`
        /* Only hide desktop menu and show mobile menu at very small screens where menu items would crowd */
        @media (max-width: 420px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-button {
            display: flex !important;
          }
        }
        
        /* Show desktop menu for all other sizes */
        @media (min-width: 421px) {
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