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
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-row">
          <div className="footer-copyright">
            © <Link 
                href="/ventures" 
                className="footer-copyright-link"
              >
                Interspace Ventures
              </Link> {year || "2025"}
          </div>
          <div className="footer-version">
            Built with Replit AI at the speed of thought • 
            <Link 
              href="/CHANGELOG.md"
              className="footer-version-link"
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