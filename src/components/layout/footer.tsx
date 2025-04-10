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
  }, []);

  // Detect if we're in dark mode for proper styling
  const isDark = mounted && resolvedTheme === 'dark'
  
  // Fixed color for consistent purple theme regardless of dark/light mode
  const purpleColor = "#5239cc";

  return (
    <footer 
      className="w-full mt-10 !bg-[#5239cc] text-white"
      style={{ 
        backgroundColor: purpleColor,
        width: '100vw',
        margin: '0',
        padding: '0',
        borderWidth: '0',
        boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.15)',
        fontFamily: "Alexandria, sans-serif"
      }}
    >
      <div className="max-w-[1200px] mx-auto py-6 px-4 sm:px-[32px]">
        <div className="footer-content flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm" style={{ color: 'white' }}>
            © <Link 
                href="/ventures" 
                className="font-medium hover:underline"
                style={{ color: 'white', textDecoration: 'none' }}
              >
                Interspace Ventures
              </Link> {year || "2025"}
          </div>
          <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            Built with Replit AI at the speed of thought • 
            <Link 
              href="/CHANGELOG.md"
              className="hover:underline ml-1"
              style={{ color: 'rgba(255, 255, 255, 0.9)' }}
            >
              v{versionInfo.version}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer