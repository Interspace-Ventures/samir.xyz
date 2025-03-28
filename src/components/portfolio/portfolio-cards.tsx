"use client"

/**
 * REDIRECTOR COMPONENT:
 * This file has been updated to serve only as a redirect to the actual implementation
 * in src/app/portfolio/page.tsx to prevent route conflicts.
 */

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function PortfolioCards() {
  const router = useRouter()
  
  useEffect(() => {
    // Automatically redirect to the portfolio page to ensure we use the new implementation
    router.push('/portfolio/')
  }, [router])

  return (
    <div className="w-full p-8">
      <div className="text-center p-10">
        <p className="text-lg">Redirecting to portfolio page...</p>
        <div className="mt-4 animate-pulse">
          <div className="h-4 w-24 mx-auto bg-purple-200 rounded"></div>
        </div>
      </div>
    </div>
  )
}