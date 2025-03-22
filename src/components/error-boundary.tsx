"use client"

import React from 'react';

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
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Log the error to console
    console.error(`Error boundary (${this.props.name || 'unnamed'}) caught an error:`, error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI
      return (
        <div className="p-4 bg-red-50 dark:bg-red-900 rounded-lg border border-red-200 dark:border-red-800">
          <h2 className="text-xl font-bold text-red-700 dark:text-red-300 mb-2">Something went wrong</h2>
          <p className="mb-2 text-red-600 dark:text-red-400">
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>
          {this.props.name && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Component: {this.props.name}
            </p>
          )}
          <div className="mt-4">
            <button
              onClick={() => window.location.reload()}
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Refresh page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}