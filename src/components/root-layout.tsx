"use client"

import React from "react"
import Navbar from "./navbar"
import Footer from "./footer"
import { ErrorBoundary } from "./error-boundary"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Simple React 19 compatible layout
  return (
    <>
      <ErrorBoundary name="Navbar">
        <Navbar />
      </ErrorBoundary>
      <div className="flex-grow pt-6">
        {children}
      </div>
      <ErrorBoundary name="Footer">
        <Footer />
      </ErrorBoundary>
    </>
  )
}