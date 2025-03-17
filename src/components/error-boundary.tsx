"use client"

import { useEffect } from 'react'

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log any errors to an error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center space-y-4 text-center">
      <div className="space-y-2">
        <h2 className="text-lg font-medium">Something went wrong!</h2>
        <p className="text-sm text-muted-foreground">
          {error.message || "Don't worry - we've been notified and will fix this issue soon."}
        </p>
      </div>
      <button
        onClick={reset}
        className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
      >
        Try again
      </button>
    </div>
  )
}