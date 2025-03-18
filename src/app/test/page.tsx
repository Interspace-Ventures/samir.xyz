"use client"

export default function TestPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white p-8">
      <h1 className="text-2xl font-bold mb-4">Test Page</h1>
      <p>This is a minimal test page to isolate rendering issues.</p>
      <div id="environment-info" className="mt-8 space-y-2">
        <h2 className="text-xl font-semibold">Environment Information:</h2>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-auto">
          {JSON.stringify({
            userAgent: window.navigator.userAgent,
            viewport: {
              width: window.innerWidth,
              height: window.innerHeight
            },
            isWebview: /wv|webview/.test(window.navigator.userAgent.toLowerCase())
          }, null, 2)}
        </pre>
      </div>
    </div>
  );
}