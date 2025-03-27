"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import getVersionInfo from "../../utils/version"

const Footer = () => {
  const [year, setYear] = useState("")
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { version } = getVersionInfo() // Get version from utility

  useEffect(() => {
    setYear(new Date().getFullYear().toString())
    setMounted(true)
  }, [])

  // Detect if we're in dark mode for proper styling
  const isDark = mounted && resolvedTheme === 'dark'
  
  // Colors based on dark/light mode with deepest enhanced purple theme
  const colors = {
    bg: isDark ? "#1b063a" : "#f3f4f6", // Deepest purple background for dark mode
    text: isDark ? "#a78df8" : "#6b7280", // Adjusted purple text for dark mode
    textHighlight: isDark ? "#ffffff" : "#111827",
    accent: isDark ? "#7e22ce" : "#8b5cf6", // Deepest purple accent for branding
    accentHover: isDark ? "#9333ea" : "#7c3aed", // Slightly brighter on hover but still deep
    muted: isDark ? "#6d28d9" : "#9ca3af", // Deepest vibrant muted text
    border: isDark ? "#4c1d95" : "#e5e7eb", // Deep purple border
    glow: isDark ? "0 0 15px rgba(109, 40, 217, 0.5)" : "none", // Enhanced purple glow for dark mode
  };

  return (
    <footer style={{
      width: "100%",
      marginTop: "40px",
      background: isDark ? 
        `linear-gradient(to bottom, ${colors.bg}, rgba(22, 5, 48, 1))` : 
        colors.bg,
      borderTop: `1px solid ${colors.border}`,
      boxShadow: isDark ? 
        `0 -5px 15px -2px rgba(76, 29, 149, 0.25), ${colors.glow}` : 
        "none", // Enhanced purple glow in dark mode
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
                  textShadow: isDark ? "0 0 5px rgba(147, 51, 234, 0.5)" : "none",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = colors.accentHover;
                  if (isDark) e.currentTarget.style.textShadow = "0 0 8px rgba(147, 51, 234, 0.8)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = colors.accent;
                  if (isDark) e.currentTarget.style.textShadow = "0 0 5px rgba(147, 51, 234, 0.5)";
                }}
              >
                Interspace Ventures
              </Link> {year || "2025"}
          </div>
          <div style={{ fontSize: "12px", color: colors.muted }}>
            Built with Replit AI at the speed of thought • v{version}
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