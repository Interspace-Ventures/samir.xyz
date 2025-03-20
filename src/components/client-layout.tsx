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
  return (
    <>
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
    </>
  )
}