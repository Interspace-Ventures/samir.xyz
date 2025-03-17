"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { ErrorBoundary } from "@/components/error-boundary"

export default function TestPage() {
  const [mounted, setMounted] = React.useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  React.useEffect(() => {
    console.log('[TestPage] Mounting with theme state:', { 
      resolvedTheme, 
      mounted,
      phase: 'render',
      hookType: 'React hooks initialization'
    });
    setMounted(true)
    return () => console.log('[TestPage] Unmounting');
  }, [resolvedTheme])

  // During SSR and initial client render, show a loading state
  if (!mounted) {
    console.log('[TestPage] Rendering loading state');
    return <div>Loading theme...</div>
  }

  try {
    console.log('[TestPage] Attempting theme access:', {
      resolvedTheme,
      currentPhase: 'pre-render',
      timestamp: new Date().toISOString()
    });

    if (!resolvedTheme) {
      console.error('[TestPage] resolvedTheme is undefined');
    }

    return (
      <ErrorBoundary name="TestPage">
        <div>
          <p>Theme state: {resolvedTheme ?? 'undefined'}</p>
          <button 
            onClick={() => {
              try {
                console.log('[TestPage] Attempting theme change from:', resolvedTheme);
                setTheme(resolvedTheme === "dark" ? "light" : "dark");
              } catch (error) {
                console.error('[TestPage] Error changing theme:', error);
                throw error;
              }
            }}
            className="px-4 py-2 mt-4 rounded bg-primary text-primary-foreground"
          >
            Switch to {resolvedTheme === "dark" ? "light" : "dark"}
          </button>
        </div>
      </ErrorBoundary>
    )
  } catch (error) {
    console.error('[TestPage] Error in render phase:', error, {
      phase: 'render',
      componentName: 'TestPage',
      hookType: 'React hooks initialization'
    });
    throw error; // This will be caught by the ErrorBoundary
  }
}