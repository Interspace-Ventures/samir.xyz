"use client"

import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    error: null
  }

  public static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)

    // Additional logging for webview debugging
    if (typeof window !== 'undefined') {
      const userAgent = window.navigator.userAgent.toLowerCase();
      console.log('Error context:', {
        isWebview: userAgent.includes('wv') || userAgent.includes('webview'),
        url: window.location.href,
        errorName: error.name,
        errorMessage: error.message,
        errorStack: error.stack,
        errorInfo,
        windowDimensions: {
          width: window.innerWidth,
          height: window.innerHeight,
        },
        browserFeatures: {
          hasLocalStorage: (() => {
            try {
              return !!window.localStorage;
            } catch (e) {
              return false;
            }
          })(),
          hasSessionStorage: (() => {
            try {
              return !!window.sessionStorage;
            } catch (e) {
              return false;
            }
          })(),
          hasIndexedDB: (() => {
            try {
              return !!window.indexedDB;
            } catch (e) {
              return false;
            }
          })(),
        }
      });
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
                ? `Error: ${this.state.error.message}` 
                : "Don't worry - we've been notified and will fix this issue soon."}
            </p>
            {process.env.NODE_ENV === 'development' && this.state.error.stack && (
              <pre className="mt-2 max-h-[200px] text-xs text-left text-red-500 bg-red-50 dark:bg-red-900/10 p-4 rounded-lg overflow-auto">
                {this.state.error.stack}
              </pre>
            )}
          </div>
          <button
            onClick={() => {
              try {
                // Log cleanup attempt
                console.log('Attempting error recovery cleanup...');

                // Clear any potential corrupted state
                if (typeof window !== 'undefined') {
                  try {
                    localStorage.clear();
                    console.log('LocalStorage cleared');
                  } catch (e) {
                    console.error('Failed to clear localStorage:', e);
                  }

                  try {
                    sessionStorage.clear();
                    console.log('SessionStorage cleared');
                  } catch (e) {
                    console.error('Failed to clear sessionStorage:', e);
                  }

                  try {
                    const req = indexedDB.deleteDatabase('next-pwa');
                    req.onsuccess = () => console.log('IndexedDB cleared');
                    req.onerror = () => console.error('Failed to clear IndexedDB');
                  } catch (e) {
                    console.error('Failed to access IndexedDB:', e);
                  }
                }

                // Log successful cleanup
                console.log('Storage cleanup completed');

                window.location.reload();
              } catch (e) {
                console.error('Failed during cleanup:', e);
                // Fallback to simple reload if cleanup fails
                window.location.reload();
              }
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
}