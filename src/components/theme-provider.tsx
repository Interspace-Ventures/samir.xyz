"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

type ThemeProviderProps = Parameters<typeof NextThemesProvider>[0]

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false)
  const [error, setError] = React.useState<Error | null>(null)

  React.useEffect(() => {
    try {
      // Log theme-related environment info
      if (typeof window !== 'undefined') {
        console.log('ThemeProvider environment:', {
          colorScheme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
          isWebview: /wv|webview/.test(window.navigator.userAgent.toLowerCase()),
          storageAvailable: (() => {
            try {
              localStorage.setItem('theme-test', 'test');
              localStorage.removeItem('theme-test');
              return true;
            } catch (e) {
              return false;
            }
          })(),
        });
      }
      setMounted(true)
    } catch (error) {
      console.error('Error in ThemeProvider mounting:', error)
      setError(error instanceof Error ? error : new Error(String(error)))
    }
  }, [])

  // Return error state if mount failed
  if (error) {
    return (
      <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/10 p-4 rounded-lg">
        Failed to initialize theme provider: {error.message}
      </div>
    );
  }

  // Return null on server and during initial mount to prevent hydration mismatch
  if (!mounted) {
    return null
  }

  return (
    <NextThemesProvider 
      attribute="class" 
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}