"use client"

import React, { useState, useEffect } from 'react'

// Simple client component wrapper - Fixed for React 19 compatibility
export function ClientWrapper({
  children,
  placeholder
}: {
  children: React.ReactNode
  placeholder?: React.ReactNode
}) {
  const [mounted, setMounted] = useState(false)
  
  // Basic mounting effect
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Return custom placeholder if provided, otherwise default
  if (!mounted) {
    return (
      <div suppressHydrationWarning={true}>
        {placeholder || <div>Loading...</div>}
      </div>
    )
  }
  
  return (
    <div suppressHydrationWarning={true}>
      {children}
    </div>
  )
}

export default ClientWrapper;