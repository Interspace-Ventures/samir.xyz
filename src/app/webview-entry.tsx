'use client';

import { useEffect, useState } from 'react';
import { isWebViewEnvironment } from '../utils/webview-compat';

/**
 * Special entry point for WebViews
 * This component provides a direct way to access the profile page for WebViews
 * by bypassing the server-side redirect chain
 */
export default function WebViewEntry() {
  const [isReady, setIsReady] = useState(false);
  const [isWebView, setIsWebView] = useState(false);

  useEffect(() => {
    // Detect if we're in a WebView
    const webViewDetected = isWebViewEnvironment();
    setIsWebView(webViewDetected);
    
    // Log the detection
    console.log(`WebViewEntry: WebView detection result: ${webViewDetected ? 'Yes' : 'No'}`);
    
    if (webViewDetected) {
      // If we're in a WebView, redirect directly to the profile page
      // This bypasses the redirect chain and goes straight to the final destination
      console.log('WebViewEntry: Redirecting WebView to /profile/');
      
      // Use a small timeout to ensure everything is ready
      setTimeout(() => {
        window.location.href = '/profile/';
      }, 100);
    } else {
      // For regular browsers, just mark as ready to allow normal routing
      setIsReady(true);
    }
  }, []);

  // If it's not a WebView, don't render anything
  // This allows the component to be included anywhere without affecting regular browsers
  if (!isWebView && isReady) {
    return null;
  }

  // Show a minimal loading state for WebViews
  return (
    <div className="fixed inset-0 bg-white z-[9999] flex flex-col items-center justify-center font-sans">
      <div className="w-10 h-10 rounded-full border-3 border-gray-200 border-t-purple-600 animate-spin" />
      <style jsx global>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
      <p className="mt-4 text-gray-600">Loading your profile...</p>
    </div>
  );
}