"use client"

import { useEffect, useState } from 'react'

export default function TestPage() {
  const [envInfo, setEnvInfo] = useState<{ [key: string]: any }>({
    status: 'Loading environment information...'
  })

  useEffect(() => {
    try {
      setEnvInfo({
        userAgent: window.navigator.userAgent,
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        },
        isWebview: /wv|webview/.test(window.navigator.userAgent.toLowerCase()),
        time: new Date().toISOString()
      })
    } catch (error) {
      setEnvInfo({
        error: 'Failed to load environment information',
        details: error instanceof Error ? error.message : String(error)
      })
    }
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <h1 className="text-2xl font-bold mb-4">Test Page</h1>
      <p>This is a minimal test page to isolate rendering issues.</p>
      <div className="mt-8 space-y-2">
        <h2 className="text-xl font-semibold">Environment Information:</h2>
        <pre className="bg-muted p-4 rounded-lg overflow-auto">
          {JSON.stringify(envInfo, null, 2)}
        </pre>
      </div>
    </div>
  )
}