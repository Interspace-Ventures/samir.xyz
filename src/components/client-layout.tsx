"use client"

import * as React from "react"
import { ErrorBoundary } from './error-boundary'
import Navbar from './navbar'
import Footer from './footer'
import { Client } from "react-hydration-provider"

// Initial skeleton that matches server render exactly
const LayoutSkeleton = () => (
  <div className="min-h-screen">
    <div className="h-20" /> {/* Navbar space */}
    <main className="flex-grow max-w-4xl mx-auto px-6 w-full py-8 mt-20">
      <div className="space-y-4">
        <div className="h-8 w-2/3" />
        <div className="h-4 w-1/2" />
      </div>
    </main>
    <footer className="mt-auto">
      <div className="h-16" />
    </footer>
  </div>
)

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    try {
      setMounted(true)
    } catch (error) {
      console.error('Error in ClientLayout mount:', error)
    }
  }, [])

  // Return skeleton on server render and initial client render
  if (!mounted) {
    return <LayoutSkeleton />
  }

  return (
    <Client>
      <div className="min-h-screen bg-white dark:bg-gray-900" data-mounted="true">
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
    </Client>
  )
}