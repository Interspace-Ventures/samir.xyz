'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isWebViewEnvironment } from '../../utils/webview-compat';

/**
 * Direct Access page
 * 
 * This page provides a client-side only entry point for WebView environments
 * that might have trouble with the redirect chain
 */
export default function DirectAccessPage() {
  const router = useRouter();
  const [status, setStatus] = useState('Initializing...');
  
  useEffect(() => {
    // Check if we're in a WebView
    const isWebView = isWebViewEnvironment();
    
    // Set status message
    setStatus(isWebView 
      ? 'WebView detected - Redirecting to profile page...' 
      : 'Standard browser detected - Redirecting to home page...');
    
    // Small delay to allow the WebView to properly initialize
    const timer = setTimeout(() => {
      // For WebViews, go directly to the profile page (final destination)
      // For regular browsers, go back to the home page
      const targetPath = isWebView ? '/profile/' : '/';
      
      // Log the redirect
      console.log(`DirectAccess page redirecting to: ${targetPath}`);
      
      // Use the router for navigation
      router.push(targetPath);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [router]);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <div className="animate-pulse mb-4">
        <svg className="w-12 h-12 text-purple-600 dark:text-purple-400 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1 className="text-2xl font-bold mb-2">Direct Access</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{status}</p>
      <div className="w-16 h-1 bg-purple-600 dark:bg-purple-400 rounded"></div>
    </div>
  );
}