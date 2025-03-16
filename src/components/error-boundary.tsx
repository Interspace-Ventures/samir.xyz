"use client"

import * as React from 'react'
import { useEffect } from 'react'

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  name?: string // Add component name for better error tracking
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: React.ErrorInfo | null
}

class ErrorBoundaryComponent extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error, errorInfo: null }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log the error with component context
    console.error(`[ErrorBoundary${this.props.name ? ` - ${this.props.name}` : ''}] Caught error:`, error)
    console.error(`[ErrorBoundary${this.props.name ? ` - ${this.props.name}` : ''}] Component stack:`, errorInfo.componentStack)

    // Update state to include error info
    this.setState({ errorInfo })

    // Log additional context for hook-related errors
    if (error.message.includes('call') || error.message.includes('ReactCurrentDispatcher')) {
      console.error('[ErrorBoundary] Hook-related error detected. Component hierarchy:', errorInfo.componentStack)
      console.error('[ErrorBoundary] Error context:', {
        phase: 'render',
        componentName: this.props.name,
        hookType: error.message.includes('ReactCurrentDispatcher') ? 'React hooks initialization' : 'Hook method call'
      })
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex min-h-[400px] flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-lg font-medium">Something went wrong!</h2>
            <p className="text-sm text-muted-foreground">
              {this.state.error?.message || "An unexpected error occurred. We've been notified and will fix this issue."}
            </p>
            {process.env.NODE_ENV === 'development' && (
              <pre className="mt-2 text-xs text-red-500 overflow-auto max-h-40">
                {this.state.error?.stack}
              </pre>
            )}
          </div>
          <button
            onClick={() => this.setState({ hasError: false, error: null, errorInfo: null })}
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

export function ErrorBoundary({ children, fallback, name }: ErrorBoundaryProps) {
  useEffect(() => {
    console.log(`[ErrorBoundary${name ? ` - ${name}` : ''}] Mounted`)
    return () => console.log(`[ErrorBoundary${name ? ` - ${name}` : ''}] Unmounted`)
  }, [name])

  return (
    <ErrorBoundaryComponent fallback={fallback} name={name}>
      {children}
    </ErrorBoundaryComponent>
  )
}

export default ErrorBoundary