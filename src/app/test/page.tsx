"use client"

import { useEffect, useState } from 'react'
import { Client } from 'react-hydration-provider'
import { ErrorBoundary } from '@/components/error-boundary'

const TestComponent = () => {
  const [envInfo, setEnvInfo] = useState<{ [key: string]: any }>({
    status: 'Loading environment information...'
  })

  useEffect(() => {
    const getEnvironmentInfo = () => {
      try {
        const info = {
          userAgent: window.navigator.userAgent,
          viewport: {
            width: window.innerWidth,
            height: window.innerHeight
          },
          isWebview: /wv|webview/.test(window.navigator.userAgent.toLowerCase()),
          time: new Date().toISOString(),
          platform: window.navigator.platform,
          webviewType: 'replit',
          renderingEnvironment: {
            isServer: typeof window === 'undefined',
            isClient: typeof window !== 'undefined',
            mounted: true
          }
        }
        console.log('Environment Info:', info)
        return info
      } catch (error) {
        console.error('Error getting environment info:', error)
        return {
          error: 'Failed to load environment information',
          details: error instanceof Error ? error.message : String(error)
        }
      }
    }

    setEnvInfo(getEnvironmentInfo())
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <h1 className="text-2xl font-bold mb-4">Environment Debug Page</h1>
      <p className="mb-6">This page helps diagnose rendering and environment issues.</p>
      <div className="mt-8 space-y-4">
        <h2 className="text-xl font-semibold">Environment Information:</h2>
        <pre className="bg-muted p-4 rounded-lg overflow-auto whitespace-pre-wrap">
          {JSON.stringify(envInfo, null, 2)}
        </pre>
      </div>
    </div>
  )
}

export default function TestPage() {
  return (
    <Client>
      <ErrorBoundary name="TestComponent">
        <TestComponent />
      </ErrorBoundary>
    </Client>
  )
}