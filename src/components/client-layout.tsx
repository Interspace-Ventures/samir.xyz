"use client"

import * as React from "react"
import { ErrorBoundary } from './error-boundary'
import Navbar from './navbar'
import Footer from './footer'
import { Client } from "react-hydration-provider"

const LayoutSkeleton = () => (
  <>
    <div className="h-20" /> {/* Navbar space */}
    <main className="flex-grow max-w-4xl mx-auto px-6 w-full py-8 mt-20">
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
      </div>
    </main>
    <footer className="mt-auto">
      <div className="h-16 bg-gray-100 dark:bg-gray-800" />
    </footer>
  </>
)

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <LayoutSkeleton />
  }

  return (
    <Client>
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
    </Client>
  )
}