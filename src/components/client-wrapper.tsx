"use client"

import * as React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { ErrorBoundary } from "@/components/error-boundary"
import { ClientThemeProvider } from "@/components/client-theme-provider"
// Import ClientLayout directly instead of using dynamic import
import ClientLayout from '@/components/client-layout'

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  // Simple state to handle client-side mounting
  const [mounted, setMounted] = React.useState(false)
  
  React.useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <ErrorBoundary name="MainLayout">
        <ClientThemeProvider suppressHydrationWarning>
          {mounted ? (
            <ClientLayout>{children}</ClientLayout>
          ) : (
            // Simple loading state that matches the server render
            <div className="min-h-screen flex items-center justify-center">
              <div className="animate-pulse text-center">
                <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded mx-auto" />
              </div>
            </div>
          )}
        </ClientThemeProvider>
      </ErrorBoundary>
    </ThemeProvider>
  )
}