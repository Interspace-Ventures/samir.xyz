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
  const isDark = mounted && resolvedTheme === 'dark';

  return (
    <footer>
      <div className="footer-container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-4">
          <div className="text-sm text-white">
            © <Link 
                href="/ventures" 
                className="font-medium hover:underline text-white no-underline"
              >
                Interspace Ventures
              </Link> {year || "2025"}
          </div>
          <div className="text-xs text-white/80">
            Built with Replit AI at the speed of thought • 
            <Link 
              href="/CHANGELOG.md"
              className="hover:underline ml-1 text-white/90"
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