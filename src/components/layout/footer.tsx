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
  
  // Colors based on dark/light mode with enhanced purple theme
  const colors = {
    bg: isDark ? "#2c0b5a" : "#f3f4f6", // Deep purple background for dark mode
    text: isDark ? "#b69df8" : "#6b7280", // Lighter purple text for dark mode
    textHighlight: isDark ? "#ffffff" : "#111827",
    accent: isDark ? "#c084fc" : "#8b5cf6", // Brighter purple for branding
    accentHover: isDark ? "#d8b4fe" : "#7c3aed", // Even brighter on hover
    muted: isDark ? "#9361f4" : "#9ca3af", // More vibrant muted text
    border: isDark ? "#5f25bf" : "#e5e7eb", // More visible purple border
    glow: isDark ? "0 0 15px rgba(139, 92, 246, 0.3)" : "none", // Purple glow for dark mode
  };

  return (
    <footer style={{
      width: "100%",
      marginTop: "40px",
      backgroundColor: colors.bg,
      borderTop: `1px solid ${colors.border}`,
      boxShadow: isDark ? colors.glow : "none", // Add subtle purple glow in dark mode
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
                  textShadow: isDark ? "0 0 5px rgba(192, 132, 252, 0.5)" : "none",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = colors.accentHover;
                  if (isDark) e.currentTarget.style.textShadow = "0 0 8px rgba(192, 132, 252, 0.8)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = colors.accent;
                  if (isDark) e.currentTarget.style.textShadow = "0 0 5px rgba(192, 132, 252, 0.5)";
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