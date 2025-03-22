"use client"

import * as React from "react"
import { ErrorBoundary } from './error-boundary'
import { DebugStatus } from './debug-status'

export default function BasicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    try {
      setMounted(true)
      console.log('BasicLayout mounted successfully', {
        timestamp: new Date().toISOString(),
      })
    } catch (error) {
      console.error('Error in BasicLayout mount:', error)
    }
  }, [])

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <header className="p-4 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold">Portfolio Site</h1>
          <nav className="mt-2">
            <ul className="flex space-x-4">
              <li><a href="/" className="text-blue-600 dark:text-blue-400 hover:underline">Home</a></li>
              <li><a href="/portfolio" className="text-blue-600 dark:text-blue-400 hover:underline">Portfolio</a></li>
              <li><a href="/ventures" className="text-blue-600 dark:text-blue-400 hover:underline">Ventures</a></li>
              <li><a href="/debug" className="text-blue-600 dark:text-blue-400 hover:underline">Debug</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow max-w-4xl mx-auto px-6 w-full py-8">
        <ErrorBoundary name="MainContent">
          {children}
          {mounted && (
            <div className="mt-4 p-2 border rounded bg-gray-50 dark:bg-gray-800">
              <p>Client-side hydration status: {mounted ? 'Complete ✅' : 'In progress...'}</p>
            </div>
          )}
        </ErrorBoundary>
        
        <ErrorBoundary name="DebugStatus">
          <div className="fixed bottom-4 right-4 z-50 opacity-80 hover:opacity-100">
            <DebugStatus />
          </div>
        </ErrorBoundary>
      </main>

      <footer className="mt-auto p-4 bg-gray-100 dark:bg-gray-800 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm text-gray-600 dark:text-gray-400">© {new Date().getFullYear()} Portfolio Site</p>
        </div>
      </footer>
    </div>
  )
}