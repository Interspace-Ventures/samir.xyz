"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

export default function Footer() {
  const [year, setYear] = useState("")

  useEffect(() => {
    setYear(new Date().getFullYear().toString())
  }, [])

  return (
    <footer className="w-full border-t border-gray-200 navbar-bg dark:border-gray-800">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="text-sm text-gray-700 dark:text-gray-200 text-center">
          © <Link href="/ventures" className="text-purple-600 dark:text-purple-400">Interspace Ventures</Link> {year || "2025"}. Built with Replit AI at the speed of thought • v2.4.2
        </div>
      </div>
    </footer>
  )
}