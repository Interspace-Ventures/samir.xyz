"use client"

import React, { useState, useEffect, Suspense } from 'react'

/**
 * Simple ClientWrapper component for Next.js
 * - Handles client-side mounting for components with browser-only features
 * - Supports React 19 with Next.js 15 following best practices
 * - Provides clean loading states and error handling
 */
export function ClientWrapper({
  children,
  placeholder,
  fallback
}: {
  children: React.ReactNode
  placeholder?: React.ReactNode
  fallback?: React.ReactNode
}) {
  const [mounted, setMounted] = useState(false)
  
  // Standard mounting effect without complex error handling
  useEffect(() => {
    setMounted(true)
    return () => setMounted(false);
  }, [])
  
  // Use Suspense with simple fallback handling
  return (
    <Suspense fallback={
      fallback || 
      <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-800/50 animate-pulse">
        Loading component...
      </div>
    }>
      {mounted ? (
        children
      ) : (
        placeholder || 
        <div className="p-2 rounded bg-gray-100 dark:bg-gray-800/30">
          Loading client content...
        </div>
      )}
    </Suspense>
  )
}

export default ClientWrapper;