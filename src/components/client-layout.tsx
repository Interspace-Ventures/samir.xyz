"use client"

import * as React from "react"
import { ErrorBoundary } from './error-boundary'
import Navbar from './navbar'
import Footer from './footer'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Handle initial client-side render
  const [isClient, setIsClient] = React.useState(false)
  React.useEffect(() => {
    setIsClient(true)
  }, [])

  // Return null on server to prevent hydration mismatch
  if (!isClient) {
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