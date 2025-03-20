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

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="animate-pulse space-y-4 p-6">
          <div className="h-8 w-1/3 bg-purple-100 dark:bg-purple-900/30 rounded" />
          <div className="h-4 w-2/3 bg-purple-50 dark:bg-purple-900/20 rounded" />
        </div>
      </div>
    )
  }

  return (
    <ThemeProvider>
      <ErrorBoundary name="MainLayout">
        <ClientLayout>{children}</ClientLayout>
      </ErrorBoundary>
    </ThemeProvider>
  )
}