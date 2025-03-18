"use client"

import * as React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import dynamic from "next/dynamic"
import { ErrorBoundary } from "@/components/error-boundary"

// Dynamically import components with SSR disabled for better webview compatibility
const Navbar = dynamic(() => import("@/components/navbar"), {
  ssr: false,
  loading: () => <div className="h-20 bg-background/80 backdrop-blur-sm border-b" />
})

const Footer = dynamic(() => import("@/components/footer"), {
  ssr: false,
  loading: () => <div className="h-16 bg-background/80 backdrop-blur-sm border-t" />
})

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Enhanced loading state with proper styling
  if (!mounted) {
    return (
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <div className="h-20 bg-background/80 backdrop-blur-sm border-b" />
        <main className="flex-grow max-w-4xl mx-auto px-6 w-full py-8">
          <div className="animate-pulse bg-muted/10 rounded-lg h-[600px]" />
        </main>
        <div className="h-16 bg-background/80 backdrop-blur-sm border-t" />
      </div>
    )
  }

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <div className="min-h-screen flex flex-col bg-background text-foreground">
          <header className="fixed top-0 left-0 right-0 z-50">
            <ErrorBoundary>
              <Navbar />
            </ErrorBoundary>
          </header>
          <main className="flex-grow max-w-4xl mx-auto px-6 w-full py-8 mt-20">
            <ErrorBoundary>
              {children}
            </ErrorBoundary>
          </main>
          <ErrorBoundary>
            <Footer />
          </ErrorBoundary>
        </div>
      </ThemeProvider>
    </ErrorBoundary>
  )
}