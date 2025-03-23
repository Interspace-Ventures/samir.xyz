"use client"

import React, { useState, useEffect, Fragment, memo } from 'react'

// Performance-optimized client component wrapper (v3.2.0) - Enhanced for React 19
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
  
  // React 19 compatibility - always use useEffect
  useEffect(() => {
    try {
      // Delay slightly to prevent hydration issues
      const timer = setTimeout(() => {
        setMounted(true)
      }, priority ? 0 : 10)
      
      return () => clearTimeout(timer)
    } catch (e) {
      // Fallback for any React 19 compatibility issues
      console.error('ClientWrapper mounting error:', e)
      setMounted(true)
    }
  }, [priority])
  
  // Return custom placeholder if provided, otherwise default
  if (!mounted) {
    return (
      <div 
        className="min-h-[250px] flex items-center justify-center" 
        suppressHydrationWarning={true}
      >
        {placeholder || (
          <div className="animate-pulse">Loading...</div>
        )}
      </div>
    )
  }
  
  // Wrap children with suppressHydrationWarning for React 19 compatibility
  return (
    <div suppressHydrationWarning={true}>
      {children}
    </div>
  )
})

export default ClientWrapper;