'use client';

import dynamic from 'next/dynamic';

// Dynamically import the WebView provider with ssr:false (valid in client components)
const WebViewProvider = dynamic(
  () => import('./webview-provider'),
  { ssr: false }
);

/**
 * Client-side wrapper for compatibility components
 * This is necessary because `ssr: false` is not allowed in server components
 */
export default function ClientCompatWrapper() {
  return <WebViewProvider />;
}