"use client"

import * as React from "react"
import { ErrorBoundary } from './error-boundary'

export default function BasicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    try {
      setMounted(true)
    } catch (error) {
      console.error('Error in BasicLayout mount:', error)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="border-b border-gray-800 bg-gray-900 py-4">
        <div className="container mx-auto px-4">
          <nav className="flex justify-center space-x-8">
            <a href="/profile" className="text-gray-300 hover:text-purple-400 font-medium transition-colors">ABOUT</a>
            <a href="/portfolio" className="text-gray-300 hover:text-purple-400 font-medium transition-colors">PORTFOLIO</a>
            <a href="/ventures" className="text-gray-300 hover:text-purple-400 font-medium transition-colors">VENTURES</a>
          </nav>
        </div>
      </header>

      <main className="flex-grow max-w-4xl mx-auto px-6 w-full py-8">
        <ErrorBoundary name="MainContent">
          {children}
        </ErrorBoundary>
      </main>

      <footer className="mt-auto p-4 bg-gray-900 border-t border-gray-800 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} Samir Patel</p>
        </div>
      </footer>
    </div>
  )
}