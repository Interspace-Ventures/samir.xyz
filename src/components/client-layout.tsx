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
  const [error, setError] = React.useState<Error | null>(null)

  React.useEffect(() => {
    try {
      // Enhanced environment logging for debugging
      if (typeof window !== 'undefined') {
        const env = {
          userAgent: window.navigator.userAgent,
          viewport: {
            width: window.innerWidth,
            height: window.innerHeight
          },
          platform: window.navigator.platform,
          isWebview: /wv|webview/.test(window.navigator.userAgent.toLowerCase()),
          storage: {
            hasLocalStorage: (() => {
              try { return !!window.localStorage } catch (e) { return false }
            })(),
            hasSessionStorage: (() => {
              try { return !!window.sessionStorage } catch (e) { return false }
            })()
          },
          theme: {
            isDarkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
            prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
          }
        };
        console.log('ClientLayout mount environment:', env);
      }
      setMounted(true)
    } catch (error) {
      console.error('Error during ClientLayout mount:', error)
      setError(error instanceof Error ? error : new Error(String(error)))
    }
  }, [])

  // Enhanced loading state with proper styling and error handling
  if (!mounted || error) {
    return (
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <div className="h-20 bg-background/80 backdrop-blur-sm border-b" />
        <main className="flex-grow max-w-4xl mx-auto px-6 w-full py-8">
          {error ? (
            <div className="animate-in fade-in slide-in-from-bottom duration-500 space-y-4">
              <h2 className="text-lg font-medium text-red-600 dark:text-red-400">
                Error Loading Application
              </h2>
              <pre className="text-sm bg-red-50 dark:bg-red-900/10 p-4 rounded-lg overflow-auto">
                {error.message}
              </pre>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Retry
              </button>
            </div>
          ) : (
            <div className="animate-pulse bg-muted/10 rounded-lg h-[600px]" />
          )}
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