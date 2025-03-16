"use client"

import * as React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { PageTransition } from "@/components/page-transition"
import { ErrorBoundary } from "@/components/error-boundary"
import dynamic from 'next/dynamic'

// Load navbar with no SSR to avoid hydration mismatches
const Navbar = dynamic(() => import("@/components/navbar"), {
  loading: () => <div className="h-20 bg-background/80 backdrop-blur-sm border-b fixed top-0 left-0 right-0 z-50" />,
  ssr: false,
})

// Load footer with no SSR to avoid hydration mismatches with date
const Footer = dynamic(() => import("@/components/footer"), {
  ssr: false, 
  loading: () => <footer className="h-16 bg-background/80 backdrop-blur-sm border-t" />
})

export function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    try {
      console.log('[RootLayout] Initializing component')
      setMounted(true)
      console.log('[RootLayout] Component mounted successfully')
    } catch (error) {
      console.error('[RootLayout] Error during mount:', error)
    }

    return () => {
      try {
        console.log('[RootLayout] Cleaning up component')
      } catch (error) {
        console.error('[RootLayout] Error during cleanup:', error)
      }
    }
  }, [])

  // Show a loading state while client-side code is hydrating
  if (!mounted) {
    console.log('[RootLayout] Waiting for hydration')
    return (
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <div className="h-20 bg-background/80 backdrop-blur-sm border-b fixed top-0 left-0 right-0 z-50" />
        <main className="flex-grow max-w-4xl mx-auto px-6 w-full py-8 mt-20">
          <div className="animate-pulse bg-muted/10 rounded-lg h-[600px] w-full" />
        </main>
        <div className="h-8" />
        <footer className="h-16 bg-background/80 backdrop-blur-sm border-t" />
      </div>
    )
  }

  return (
    <ErrorBoundary>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <div className="min-h-screen flex flex-col bg-background text-foreground">
          <div className="fixed top-0 left-0 right-0 z-50">
            <ErrorBoundary>
              <Navbar />
            </ErrorBoundary>
          </div>
          <main className="flex-grow max-w-4xl mx-auto px-6 w-full py-8 mt-20">
            <React.Suspense 
              fallback={
                <div className="animate-pulse bg-muted/10 rounded-lg h-[600px] w-full" />
              }
            >
              <ErrorBoundary>
                <PageTransition>
                  {children}
                </PageTransition>
              </ErrorBoundary>
            </React.Suspense>
          </main>
          <div className="h-8" />
          <ErrorBoundary>
            <Footer />
          </ErrorBoundary>
        </div>
      </ThemeProvider>
    </ErrorBoundary>
  )
}