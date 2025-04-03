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
    bg: isDark ? "#12022e" : "#f3f4f6", // Deep purple background for dark mode (#12022e)
    text: isDark ? "#a78df8" : "#6b7280", // Adjusted purple text for dark mode
    textHighlight: isDark ? "#ffffff" : "#111827",
    accent: isDark ? "#5b21b6" : "#8b5cf6", // Ultra-deep purple accent for branding
    accentHover: isDark ? "#6d28d9" : "#7c3aed", // Slightly brighter on hover but still ultra-deep
    muted: isDark ? "#4c1d95" : "#9ca3af", // Ultra-deep vibrant muted text
    border: isDark ? "#3b0764" : "#e5e7eb", // Ultra-deep purple border
    glow: isDark ? "0 0 15px rgba(91, 33, 182, 0.7)" : "none", // Enhanced ultra-deep purple glow
  };

  return (
    <footer className={`w-full mt-10 transition-colors duration-300 border-t ${
      isDark 
        ? 'bg-[#12022e] border-purple-950/50 shadow-[0_-5px_15px_-2px_rgba(59,7,100,0.35),0_-2px_10px_rgba(91,33,182,0.25),0_0_15px_rgba(91,33,182,0.7)] text-purple-300' 
        : 'bg-gray-50 border-gray-200 text-gray-600'
    }`}>
      <div className="max-w-[1200px] mx-auto py-6 px-4 flex flex-col gap-4">
        <div className="footer-content flex flex-col justify-between items-center gap-4">
          <div className="text-sm">
            © <Link 
                href="/ventures" 
                className={`font-medium relative px-0.5 transition-all duration-200 ${
                  isDark 
                    ? 'text-purple-300 hover:text-purple-200 shadow-purple-800/30 hover:shadow-purple-800/50' 
                    : 'text-purple-600 hover:text-purple-700'
                }`}
                style={{
                  textShadow: isDark ? "0 0 5px rgba(139, 92, 246, 0.8), 0 0 15px rgba(167, 139, 250, 0.6)" : "none",
                  textDecoration: "none"
                }}
                onMouseOver={(e) => {
                  if (isDark) e.currentTarget.style.textShadow = "0 0 8px rgba(139, 92, 246, 0.9), 0 0 20px rgba(167, 139, 250, 0.8)";
                }}
                onMouseOut={(e) => {
                  if (isDark) e.currentTarget.style.textShadow = "0 0 5px rgba(139, 92, 246, 0.8), 0 0 15px rgba(167, 139, 250, 0.6)";
                }}
              >
                Interspace Ventures
              </Link> {year || "2025"}
          </div>
          <div className={`text-xs ${isDark ? 'text-purple-400/80' : 'text-gray-500'}`}>
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