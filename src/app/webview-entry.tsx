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
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'white',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <div 
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: '3px solid #e5e7eb',
          borderTopColor: '#9333ea',
          animation: 'spin 1s linear infinite',
        }}
      />
      <style jsx global>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
      <p style={{ marginTop: '16px', color: '#4b5563' }}>Loading your profile...</p>
    </div>
  );
}