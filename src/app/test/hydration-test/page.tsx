"use client"

import { useEffect, useState } from 'react'
import { Client } from 'react-hydration-provider'
import { ErrorBoundary } from '@/components/error-boundary'

const HydrationTest = () => {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">Hydration Test Page</h1>
      
      {/* This div should have matching classes server/client */}
      <div className="min-h-screen">
        <p>Mounted state: {mounted ? 'Yes' : 'No'}</p>
      </div>

      {/* Only add classes after mount */}
      <div className={mounted ? 'bg-white dark:bg-gray-900 p-4 rounded' : ''}>
        <p>This box should only have styling after mount</p>
      </div>

      {/* Test dynamic content */}
      <div>
        <p>Current time (client-only): {mounted ? new Date().toISOString() : ''}</p>
      </div>
    </div>
  )
}

export default function TestPage() {
  return (
    <Client>
      <ErrorBoundary name="HydrationTest">
        <HydrationTest />
      </ErrorBoundary>
    </Client>
  )
}
