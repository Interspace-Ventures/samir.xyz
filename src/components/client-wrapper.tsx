"use client"

import * as React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { ErrorBoundary } from "@/components/error-boundary"
import { ClientThemeProvider } from "@/components/client-theme-provider"
import dynamic from 'next/dynamic'

// Dynamically import ClientLayout with error handling
const ClientLayout = dynamic(
  () => import('@/components/client-layout').catch(err => {
    console.error('Failed to load ClientLayout:', err);
    return () => (
      <div className="p-4">
        <p>Failed to load layout. Please try refreshing the page.</p>
      </div>
    );
  }),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded mx-auto" />
        </div>
      </div>
    )
  }
);

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