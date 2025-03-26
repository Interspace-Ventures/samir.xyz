"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import getVersionInfo from "../../utils/version"

const Footer = () => {
  const [year, setYear] = useState("")
  const { version } = getVersionInfo() // Get version from utility

  useEffect(() => {
    setYear(new Date().getFullYear().toString())
  }, [])

  return (
    <footer className="w-full border-t border-gray-700/20 mt-10 text-gray-400">
      <div className="max-w-4xl mx-auto px-6 py-4">
        <div className="text-xs">
          © <Link href="/ventures" className="text-purple-400 hover:text-purple-300 transition-colors">Interspace Ventures</Link> {year || "2025"} • Built with Replit AI at the speed of thought • v{version}
        </div>
      </div>
    </footer>
  )
}

export default Footer