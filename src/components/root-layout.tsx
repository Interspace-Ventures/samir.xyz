"use client"

import * as React from "react"
import { ThemeProvider } from "@/components/theme-provider";
import { PageTransition } from "@/components/page-transition";
import dynamic from 'next/dynamic';

// Load navbar with no SSR to avoid hydration mismatches
const Navbar = dynamic(() => import("@/components/navbar"), {
  loading: () => <div className="h-20 bg-background/80 backdrop-blur-sm border-b fixed top-0 left-0 right-0 z-50" />,
  ssr: false,
});

// Load footer with no SSR to avoid hydration mismatches with date
const Footer = dynamic(() => import("@/components/footer"), {
  ssr: false, 
  loading: () => <footer className="h-16 bg-background/80 backdrop-blur-sm border-t" />
});

export function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);
  const [isWebview, setIsWebview] = React.useState(false);

  React.useEffect(() => {
    try {
      // Check if we're in a webview environment
      const userAgent = window.navigator.userAgent.toLowerCase();
      setIsWebview(userAgent.includes('wv') || userAgent.includes('webview'));

      // Log environment details for debugging
      console.log('Environment:', {
        userAgent,
        isWebview: userAgent.includes('wv') || userAgent.includes('webview'),
        hasLocalStorage: typeof window !== 'undefined' && !!window.localStorage,
        hasSessionStorage: typeof window !== 'undefined' && !!window.sessionStorage,
        windowDimensions: typeof window !== 'undefined' ? {
          innerWidth: window.innerWidth,
          innerHeight: window.innerHeight,
          devicePixelRatio: window.devicePixelRatio
        } : null,
        browserFeatures: {
          hasIntersectionObserver: typeof IntersectionObserver !== 'undefined',
          hasResizeObserver: typeof ResizeObserver !== 'undefined',
          hasMutationObserver: typeof MutationObserver !== 'undefined'
        }
      });

      // Safe to mark as mounted after environment check
      setMounted(true);
    } catch (e) {
      console.error('Error during initialization:', e);
      setError(e as Error);
    }
  }, []);

  // Add error boundary at root level
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
        <div className="space-y-4 text-center">
          <h1 className="text-xl font-bold">Something went wrong</h1>
          <p className="text-muted-foreground">
            {process.env.NODE_ENV === 'development' ? error.message : 'An error occurred while loading the application.'}
          </p>
          <button 
            onClick={() => {
              try {
                // Clear any potential corrupted state
                if (typeof window !== 'undefined') {
                  localStorage.clear();
                  sessionStorage.clear();
                }
                window.location.reload();
              } catch (e) {
                console.error('Error during recovery:', e);
              }
            }} 
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Reload page
          </button>
        </div>
      </div>
    );
  }

  // Show a loading state while client-side code is hydrating
  if (!mounted) {
    return (
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <div className="h-20 bg-background/80 backdrop-blur-sm border-b fixed top-0 left-0 right-0 z-50" />
        <main className="flex-grow max-w-4xl mx-auto px-6 w-full py-8 mt-20">
          <div className="animate-pulse bg-muted/10 rounded-lg h-[600px] w-full" />
        </main>
        <div className="h-8" />
        <footer className="h-16 bg-background/80 backdrop-blur-sm border-t" />
      </div>
    );
  }

  return (
    <ThemeProvider>
      <div className={`min-h-screen flex flex-col bg-background text-foreground ${isWebview ? 'webview' : ''}`}>
        <div className="fixed top-0 left-0 right-0 z-50">
          <Navbar />
        </div>
        <main className="flex-grow max-w-4xl mx-auto px-6 w-full py-8 mt-20">
          <React.Suspense 
            fallback={
              <div className="animate-pulse bg-muted/10 rounded-lg h-[600px] w-full" />
            }
          >
            <PageTransition>
              {children}
            </PageTransition>
          </React.Suspense>
        </main>
        <div className="h-8" />
        <Footer />
      </div>
    </ThemeProvider>
  );
}