"use client"

import React from "react"

/**
 * Simplified ContentLayout component
 * - Only handles content, no navbar or footer (those are in the main RootLayout)
 * - Renamed from RootLayout to ContentLayout to avoid conflicts with Next.js app/layout.tsx
 * - Should be used inside pages that need specific layout for content area only
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