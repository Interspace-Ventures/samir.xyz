"use client"

import React from "react"
import Footer from "./footer"
import { ErrorBoundary } from "../error-boundary"

/**
 * Simplified RootLayout component
 * - Only handles content and footer
 * - Navbar is now in the app layout.tsx
 * - Improves maintainability with cleaner code structure
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow px-4 sm:px-6 py-8 max-w-7xl mx-auto w-full">
        {children}
      </div>
      <ErrorBoundary name="Footer">
        <Footer />
      </ErrorBoundary>
    </div>
  )
}