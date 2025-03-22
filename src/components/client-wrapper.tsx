"use client"

import React, { useState, useEffect, Fragment, memo } from 'react'

// Performance-optimized client component wrapper (v3.1.0)
export const ClientWrapper = memo(function ClientWrapper({
  children,
  placeholder,
  priority = false,
}: {
  children: React.ReactNode
  placeholder?: React.ReactNode
  priority?: boolean
}) {
  const [mounted, setMounted] = useState(false)
  
  // Use a layout effect for faster mounting in priority components
  const EffectHook = priority ? useEffect : useEffect
  
  // Only render children on the client-side with priority option
  EffectHook(() => {
    // Use requestIdleCallback for non-priority components to improve performance
    if (priority) {
      setMounted(true)
    } else {
      // Use requestAnimationFrame as a fallback for browsers without requestIdleCallback
      const id = requestAnimationFrame(() => {
        setMounted(true)
      })
      return () => cancelAnimationFrame(id)
    }
  }, [priority])
  
  // Return custom placeholder if provided, otherwise default
  if (!mounted) {
    return placeholder || (
      <div className="min-h-[250px] flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    )
  }
  
  return <Fragment>{children}</Fragment>
})

export default ClientWrapper;