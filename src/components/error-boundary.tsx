"use client"

import * as React from "react"
import type { ReactNode } from "react"

interface Props {
  children: ReactNode;
  name?: string;
}

interface State {
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    error: null,
    errorInfo: null
  }

  public static getDerivedStateFromError(error: Error): State {
    return { error, errorInfo: null }
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
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
        }
      } : 'server-side',
      timestamp: new Date().toISOString(),
    }

    console.error('ErrorBoundary caught error:', errorContext)
    this.setState({ error, errorInfo })
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
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
        </div>
      )
    }

    return this.props.children
  }
}