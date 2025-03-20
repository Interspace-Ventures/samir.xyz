"use client"

import * as React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { ErrorBoundary } from "@/components/error-boundary"
import ClientLayout from "@/components/client-layout"

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const [mounted, setMounted] = React.useState(false)

  // Wait for component to mount before rendering anything
  React.useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      setMounted(true)
    }, 10)
    return () => clearTimeout(timer)
  }, [])

  // Return a simple placeholder until fully mounted
  if (!mounted) {
    return (
      <div className="min-h-screen bg-background">
        <div className="animate-pulse space-y-4 p-6">
          <div className="h-8 w-1/3 bg-muted rounded" />
          <div className="h-4 w-2/3 bg-muted rounded" />
        </div>
      </div>
    )
  }

  return (
    <ThemeProvider>
      <ErrorBoundary name="MainLayout">
        <ClientLayout>
          {children}
        </ClientLayout>
      </ErrorBoundary>
    </ThemeProvider>
  )
}