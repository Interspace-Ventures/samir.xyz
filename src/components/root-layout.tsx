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
  return (
    <div className="flex flex-col min-h-screen">
      <ErrorBoundary name="Navbar">
        <Navbar />
      </ErrorBoundary>
      <div className="flex-grow pt-6">
        {children}
      </div>
      <ErrorBoundary name="Footer">
        <Footer />
      </ErrorBoundary>
    </div>
  )
}