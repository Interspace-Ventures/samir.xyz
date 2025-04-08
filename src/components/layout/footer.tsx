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
  
  // Colors based on dark/light mode with updated purple theme
  const colors = {
    bg: isDark ? "#5239cc" : "#f3f4f6", // Updated purple background for dark mode (#5239cc)
    text: isDark ? "#d8b4fe" : "#6b7280", // Purple-300 for dark mode text (matches link-underline)
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
        ? '!bg-[#5239cc] border-purple-950/50 shadow-[0_-5px_15px_-2px_rgba(59,7,100,0.35),0_-2px_10px_rgba(91,33,182,0.25),0_0_15px_rgba(91,33,182,0.7)] text-purple-300' 
        : '!bg-gray-50 border-gray-200 text-gray-600'
    }`} style={{ backgroundColor: isDark ? '#5239cc' : '#f9fafb' }}>
      <div className="max-w-[1200px] mx-auto py-6 px-4 sm:px-[32px] flex flex-col gap-4">
        <div className="footer-content flex flex-col justify-between items-center gap-4">
          <div className="text-sm font-inter">
            © <Link 
                href="/ventures" 
                className="link-underline font-medium"
              >
                Interspace Ventures
              </Link> {year || "2025"}
          </div>
          <div className={`text-xs font-inter ${isDark ? 'text-purple-300/80' : 'text-gray-500'}`}>
            Built with Replit AI at the speed of thought • v{versionInfo.version}
          </div>
        </div>
      </div>
      
      <style jsx global>{`
        @media (min-width: 768px) {
          .footer-content {
            flex-direction: row;
            align-items: center;
          }
        }
      `}</style>
    </footer>
  )
}

export default Footer