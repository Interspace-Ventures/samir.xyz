"use client"

import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
  name?: string
}

interface State {
  error: Error | null
  errorInfo: ErrorInfo | null
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    error: null,
    errorInfo: null
  }

  public static getDerivedStateFromError(error: Error): State {
    return { error, errorInfo: null }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Enhanced error logging
    const errorContext = {
      componentName: this.props.name || 'Unknown',
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack,
      },
      errorInfo,
      environment: typeof window !== 'undefined' ? {
        userAgent: window.navigator.userAgent,
        isWebview: /wv|webview/.test(window.navigator.userAgent.toLowerCase()),
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight,
        },
        theme: {
          prefersColorScheme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
          prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        },
        storage: {
          hasLocalStorage: this.checkStorage('localStorage'),
          hasSessionStorage: this.checkStorage('sessionStorage'),
          hasIndexedDB: this.checkStorage('indexedDB'),
        },
        fontLoading: {
          fonts: Array.from(document.fonts || []).map(font => ({
            family: font.family,
            status: font.status,
          })),
        }
      } : 'server-side',
      timestamp: new Date().toISOString(),
    }

    console.error('ErrorBoundary caught error:', errorContext)
    this.setState({ error, errorInfo })
  }

  private checkStorage(type: 'localStorage' | 'sessionStorage' | 'indexedDB'): boolean {
    try {
      if (type === 'indexedDB') return !!window.indexedDB
      const storage = window[type]
      const testKey = `test-${Math.random()}`
      storage.setItem(testKey, testKey)
      storage.removeItem(testKey)
      return true
    } catch (e) {
      return false
    }
  }

  public render() {
    if (this.state.error) {
      return (
        <div className="flex min-h-[400px] flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-lg font-medium">Something went wrong!</h2>
            <p className="text-sm text-muted-foreground">
              {process.env.NODE_ENV === 'development' 
                ? `Error in ${this.props.name || 'Unknown'}: ${this.state.error.message}` 
                : "We've been notified and will fix this issue soon."}
            </p>
            {process.env.NODE_ENV === 'development' && (
              <pre className="mt-2 max-h-[200px] text-xs text-left text-red-500 bg-red-50 dark:bg-red-900/10 p-4 rounded-lg overflow-auto">
                {this.state.error.stack}
                {this.state.errorInfo && (
                  '\n\nComponent Stack:\n' + this.state.errorInfo.componentStack
                )}
              </pre>
            )}
          </div>
          <button
            onClick={() => {
              console.log('Attempting error recovery...')
              this.cleanupStorage()
              window.location.reload()
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
        </div>
      )
    }

    return this.props.children
  }

  private cleanupStorage() {
    if (typeof window === 'undefined') return

    const cleanup = (operation: () => void, name: string) => {
      try {
        operation()
        console.log(`Cleaned up ${name}`)
      } catch (e) {
        console.error(`Failed to clean up ${name}:`, e)
      }
    }

    cleanup(() => localStorage.clear(), 'localStorage')
    cleanup(() => sessionStorage.clear(), 'sessionStorage')
    cleanup(() => {
      const req = indexedDB.deleteDatabase('next-pwa')
      req.onsuccess = () => console.log('Cleaned up IndexedDB')
      req.onerror = () => console.error('Failed to clean up IndexedDB')
    }, 'indexedDB')
  }
}