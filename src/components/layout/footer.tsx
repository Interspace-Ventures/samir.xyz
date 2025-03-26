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
  
  // Colors based on dark/light mode
  const colors = {
    bg: isDark ? "#111827" : "#f3f4f6",
    text: isDark ? "#9ca3af" : "#6b7280",
    textHighlight: isDark ? "#ffffff" : "#111827",
    accent: isDark ? "#a78bfa" : "#8b5cf6", // Purple for brand
    accentHover: isDark ? "#c4b5fd" : "#7c3aed",
    muted: isDark ? "#6b7280" : "#9ca3af",
    border: isDark ? "#374151" : "#e5e7eb",
  };

  return (
    <footer style={{
      width: "100%",
      marginTop: "40px",
      backgroundColor: colors.bg,
      borderTop: `1px solid ${colors.border}`,
      color: colors.text,
      transition: "background-color 0.3s, color 0.3s, border-color 0.3s",
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
                  transition: "color 0.2s ease",
                }}
                onMouseOver={(e) => e.currentTarget.style.color = colors.accentHover}
                onMouseOut={(e) => e.currentTarget.style.color = colors.accent}
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