"use client"

import React, { useState, useEffect, Suspense } from 'react'

/**
 * Enhanced ClientWrapper component with improved hydration handling
 * - Uses suppressHydrationWarning for React 19 compatibility
 * - Properly handles server/client rendering differences
 * - Provides fallback UI during hydration
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
  
  // Safely handle mounting state
  useEffect(() => {
    try {
      // Use requestAnimationFrame to ensure we're in the browser environment
      const raf = requestAnimationFrame(() => {
        setMounted(true)
      })
      
      return () => cancelAnimationFrame(raf)
    } catch (e) {
      // Fallback for environments where requestAnimationFrame isn't available
      setMounted(true)
      console.error('ClientWrapper mounting error:', e)
    }
  }, [])
  
  // Use Suspense to handle any async loading issues
  return (
    <Suspense fallback={fallback || <div suppressHydrationWarning>Loading component...</div>}>
      <div suppressHydrationWarning={true}>
        {mounted ? children : (placeholder || <div>Loading client content...</div>)}
      </div>
    </Suspense>
  )
}

export default ClientWrapper;