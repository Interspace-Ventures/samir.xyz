"use client"

import * as React from "react"
import { ErrorBoundary } from './error-boundary'
import dynamic from 'next/dynamic'

// Import client components directly since we're in a client component
import Navbar from './navbar'
import Footer from './footer'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Show nothing until mounted to prevent hydration mismatch
  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col">
      <ErrorBoundary name="Navbar">
        <Navbar />
      </ErrorBoundary>

      <main className="flex-grow max-w-4xl mx-auto px-6 w-full py-8 mt-20">
        <ErrorBoundary name="MainContent">
          {children}
        </ErrorBoundary>
      </main>

      <footer className="mt-auto">
        <ErrorBoundary name="Footer">
          <Footer />
        </ErrorBoundary>
      </footer>
    </div>
  )
}