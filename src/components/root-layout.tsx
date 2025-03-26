"use client"

import React from "react"
import Footer from "./footer"
import { ErrorBoundary } from "./error-boundary"

// Updated to work with the new app layout approach
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        {children}
      </div>
      <ErrorBoundary name="Footer">
        <Footer />
      </ErrorBoundary>
    </div>
  )
}