"use client"

import * as React from "react"
import { ErrorBoundary } from './error-boundary'
import Navbar from './navbar'
import Footer from './footer'
import { Client } from "react-hydration-provider"

// Initial skeleton that matches server render exactly
const LayoutSkeleton = () => (
  <div className="min-h-screen bg-black">
    <div className="h-20 bg-gradient-to-r from-gray-900 to-black border-b border-gray-800/30" /> {/* Navbar space */}
    <main className="flex-grow max-w-4xl mx-auto px-6 w-full py-8 mt-20">
      <div className="space-y-6">
        <div className="h-10 w-2/3 bg-gray-800/30 rounded-lg animate-pulse" />
        <div className="h-5 w-1/2 bg-gray-800/20 rounded-lg animate-pulse" />
        <div className="h-64 w-full bg-gradient-to-br from-gray-900/50 to-purple-900/10 rounded-xl animate-pulse" />
      </div>
    </main>
    <footer className="mt-auto border-t border-gray-800/30 bg-gradient-to-t from-black to-gray-900/50">
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
      console.log('ClientLayout mounted successfully', {
        timestamp: new Date().toISOString(),
        reactVersion: React.version
      })
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
      <div className="min-h-screen bg-black" data-mounted="true">
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