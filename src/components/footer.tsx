"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

const Footer = () => {
  const [year, setYear] = useState("")

  useEffect(() => {
    setYear(new Date().getFullYear().toString())
  }, [])

  return (
    <footer className="w-full border-t border-gray-200 bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="text-sm">
          © <Link href="/ventures" className="text-purple-600 dark:text-purple-400 hover:opacity-80 transition-opacity">Interspace Ventures</Link> {year || "2025"}. Built with Replit AI at the speed of thought • v2.4.5
        </div>
      </div>
    </footer>
  )
}

export default Footer