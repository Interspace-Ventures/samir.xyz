"use client"

import React from "react"
import Footer from "./footer"
import { ErrorBoundary } from "../error-boundary"

/**
 * Simplified ContentLayout component
 * - Only handles content and footer
 * - Renamed from RootLayout to ContentLayout to avoid conflicts with Next.js app/layout.tsx
 * - Should be used inside pages that need specific layout but not navigation
 */
export default function ContentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col">
      <div className="px-4 sm:px-6 py-8 max-w-7xl mx-auto w-full">
        {children}
      </div>
    </div>
  )
}