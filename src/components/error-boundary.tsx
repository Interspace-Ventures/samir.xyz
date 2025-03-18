"use client"

import * as React from "react"

interface Props {
  children: React.ReactNode
  name?: string
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
      error: null
    }
  }

  static getDerivedStateFromError(error: Error) {
    console.error('ErrorBoundary caught error:', error);
    // Clear any problematic cached data
    try {
      if (typeof window !== 'undefined') {
        sessionStorage.clear();
        localStorage.clear();
      }
    } catch (e) {
      console.warn('Failed to clear storage:', e);
    }
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Log the error to console with component name and stack trace
    console.error(`ErrorBoundary (${this.props.name || 'unnamed'}) caught error:`, {
      error: error.message,
      component: this.props.name,
      stack: error.stack,
      componentStack: info.componentStack
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[200px] flex-col items-center justify-center space-y-4 text-center p-4 rounded-lg border border-red-200 bg-red-50">
          <div className="space-y-2">
            <h2 className="text-lg font-medium text-red-700">Something went wrong!</h2>
            <p className="text-sm text-red-600">
              {process.env.NODE_ENV === 'development' 
                ? `Error in ${this.props.name || 'component'}: ${this.state.error?.message}` 
                : "We've been notified and will fix this issue soon."}
            </p>
          </div>
          <button
            onClick={() => {
              // Clear any cached state that might be causing the error
              try {
                if (typeof window !== 'undefined') {
                  window.location.reload();
                }
              } catch (e) {
                console.warn('Failed to reload page:', e);
              }
            }}
            className="inline-flex items-center justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-red-700"
          >
            Try again
          </button>
        </div>
      )
    }

    return this.props.children
  }
}