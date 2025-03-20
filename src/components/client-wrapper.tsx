"use client"

import * as React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { ErrorBoundary } from "@/components/error-boundary"
import { ClientThemeProvider } from "@/components/client-theme-provider"
import ClientLayout from "@/components/client-layout"

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <ErrorBoundary name="MainLayout">
        <ClientThemeProvider suppressHydrationWarning>
          <ClientLayout>{children}</ClientLayout>
        </ClientThemeProvider>
      </ErrorBoundary>
    </ThemeProvider>
  )
}