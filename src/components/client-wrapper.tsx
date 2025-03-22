"use client"

import React from 'react'

// Improved client component wrapper for hydration purposes
export function ClientWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const [mounted, setMounted] = React.useState(false)
  
  // Only render children on the client-side
  React.useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) {
    return <div className="min-h-[300px] flex items-center justify-center">
      <div className="animate-pulse">Loading...</div>
    </div>
  }
  
  return <React.Fragment>{children}</React.Fragment>
}

export default ClientWrapper;