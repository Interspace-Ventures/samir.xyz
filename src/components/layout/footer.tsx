"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { getVersionInfoSync } from "../../utils/version"

const Footer = () => {
  const [year, setYear] = useState("")
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [versionInfo, setVersionInfo] = useState(getVersionInfoSync())
  
  useEffect(() => {
    // Use the default synchronous version initially, then try to fetch the latest
    const loadVersion = async () => {
      try {
        const response = await fetch('/version.json');
        if (response.ok) {
          const data = await response.json();
          setVersionInfo({
            version: data.version,
            lastUpdated: data.lastUpdated,
            name: data.name
          });
        }
      } catch (err) {
        console.warn('Using default version data');
      }
    };
    
    loadVersion();
  }, []);

  useEffect(() => {
    setYear(new Date().getFullYear().toString())
    setMounted(true)
  }, [])

  // Detect if we're in dark mode for proper styling
  const isDark = mounted && resolvedTheme === 'dark'
  
  // Colors based on dark/light mode with ultra-deep enhanced purple theme
  const colors = {
    bg: isDark ? "#12022e" : "#f3f4f6", // Ultra-deep purple background for dark mode
    text: isDark ? "#a78df8" : "#6b7280", // Adjusted purple text for dark mode
    textHighlight: isDark ? "#ffffff" : "#111827",
    accent: isDark ? "#5b21b6" : "#8b5cf6", // Ultra-deep purple accent for branding
    accentHover: isDark ? "#6d28d9" : "#7c3aed", // Slightly brighter on hover but still ultra-deep
    muted: isDark ? "#4c1d95" : "#9ca3af", // Ultra-deep vibrant muted text
    border: isDark ? "#3b0764" : "#e5e7eb", // Ultra-deep purple border
    glow: isDark ? "0 0 15px rgba(91, 33, 182, 0.7)" : "none", // Enhanced ultra-deep purple glow
  };

  return (
    <footer style={{
      width: "100%",
      marginTop: "40px",
      background: isDark ? 
        `linear-gradient(125deg, ${colors.bg}, rgba(14, 2, 34, 0.98), rgba(10, 1, 26, 1), rgba(16, 3, 38, 0.97), rgba(12, 2, 30, 0.99))` : 
        colors.bg,
      borderTop: `1px solid ${colors.border}`,
      boxShadow: isDark ? 
        `0 -5px 15px -2px rgba(59, 7, 100, 0.35), 0 -2px 10px rgba(91, 33, 182, 0.25), ${colors.glow}` : 
        "none", // Ultra-deep enhanced purple glow in dark mode
      color: colors.text,
      transition: "background-color 0.3s, color 0.3s, border-color 0.3s, box-shadow 0.3s",
      position: "relative",
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "24px 16px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "16px",
        }} className="footer-content">
          <div style={{ fontSize: "14px" }}>
            © <Link 
                href="/ventures" 
                style={{ 
                  color: colors.accent,
                  fontWeight: 500,
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                  position: "relative",
                  padding: "0 2px",
                  textShadow: isDark ? "0 0 5px rgba(91, 33, 182, 0.7), 0 0 15px rgba(139, 92, 246, 0.4)" : "none",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = colors.accentHover;
                  if (isDark) e.currentTarget.style.textShadow = "0 0 8px rgba(91, 33, 182, 0.9), 0 0 20px rgba(139, 92, 246, 0.6)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = colors.accent;
                  if (isDark) e.currentTarget.style.textShadow = "0 0 5px rgba(91, 33, 182, 0.7), 0 0 15px rgba(139, 92, 246, 0.4)";
                }}
              >
                Interspace Ventures
              </Link> {year || "2025"}
          </div>
          <div style={{ fontSize: "12px", color: colors.muted }}>
            Built with Replit AI at the speed of thought • v{versionInfo.version}
          </div>
        </div>
      </div>
      
      <style jsx global>{`
        @media (min-width: 768px) {
          .footer-content {
            flex-direction: row !important;
            align-items: center !important;
          }
        }
      `}</style>
    </footer>
  )
}

export default Footer