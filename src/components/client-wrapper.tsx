"use client"

import React, { useState, useEffect, Suspense } from 'react'

/**
 * Enhanced ClientWrapper component with improved hydration handling
 * - Uses suppressHydrationWarning for React 19 compatibility
 * - Properly handles server/client rendering differences
 * - Provides fallback UI during hydration
 * - Now with additional compatibility fixes for Replit Webview
 */
export function ClientWrapper({
  children,
  placeholder,
  fallback
}: {
  children: React.ReactNode
  placeholder?: React.ReactNode
  fallback?: React.ReactNode
}) {
  const [mounted, setMounted] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  
  // Safely handle mounting state with enhanced error handling
  useEffect(() => {
    try {
      // Debug log to trace component lifecycle
      console.log('ClientWrapper mounting...')
      
      // Use setTimeout instead of requestAnimationFrame for better compatibility
      const timer = setTimeout(() => {
        try {
          setMounted(true)
          console.log('ClientWrapper mounted successfully')
        } catch (err) {
          console.error('Error during mount state update:', err)
          setError(err instanceof Error ? err : new Error(String(err)))
        }
      }, 10)
      
      return () => clearTimeout(timer)
    } catch (e) {
      // Fallback for environments where setTimeout isn't available
      console.error('ClientWrapper initialization error:', e)
      setError(e instanceof Error ? e : new Error(String(e)))
      
      // Still try to render even if there was an error
      setMounted(true)
    }
  }, [])
  
  // Additional compatibility handling for difficult environments
  useEffect(() => {
    // Attempt to fix React hydration issues by re-rendering once
    if (mounted) {
      const timer = setTimeout(() => {
        try {
          // Force a re-render by updating state
          setMounted(prev => {
            console.log('ClientWrapper forcing re-render for hydration stability')
            return prev
          })
        } catch (err) {
          console.error('Error during re-render:', err)
        }
      }, 100)
      
      return () => clearTimeout(timer)
    }
  }, [mounted])
  
  // If there was an error, show it
  if (error) {
    return (
      <div style={{ 
        padding: '1rem',
        margin: '1rem 0', 
        border: '1px solid #f56565',
        borderRadius: '0.375rem',
        backgroundColor: '#fff5f5',
        color: '#c53030'
      }}>
        <h4 style={{ margin: '0 0 0.5rem 0' }}>Component Error</h4>
        <p>{error.message}</p>
      </div>
    )
  }
  
  // Use Suspense with enhanced fallback handling
  return (
    <Suspense fallback={
      fallback || 
      <div suppressHydrationWarning style={{
        padding: '1rem', 
        backgroundColor: '#f3f4f6',
        borderRadius: '0.375rem',
        color: '#4b5563'
      }}>
        Loading component...
      </div>
    }>
      <div suppressHydrationWarning={true}>
        {mounted ? children : (
          placeholder || 
          <div style={{
            padding: '0.5rem',
            backgroundColor: '#f9fafb',
            borderRadius: '0.25rem'
          }}>
            Loading client content...
          </div>
        )}
      </div>
    </Suspense>
  )
}

export default ClientWrapper;