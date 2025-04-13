'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isWebViewEnvironment, redirectWebView } from '../../utils/webview-compat';

interface WebViewRedirectProps {
  targetPath: string;
  fallback?: React.ReactNode;
}

/**
 * WebView Redirect Component
 * 
 * Provides a special redirect specifically for WebViews
 * Helps bypass complex redirect chains that can cause issues in WebViews
 */
export default function WebViewRedirect({ 
  targetPath, 
  fallback = null 
}: WebViewRedirectProps) {
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);
  
  useEffect(() => {
    // Only redirect if we're in a WebView
    if (isWebViewEnvironment()) {
      setIsRedirecting(true);
      
      // Log the redirect
      console.log(`WebViewRedirect: Redirecting WebView to ${targetPath}`);
      
      // Use our WebView-specific redirect helper
      redirectWebView(targetPath);
    } else {
      // For regular browsers, use the Next.js router
      router.push(targetPath);
    }
  }, [targetPath, router]);
  
  // Return fallback content if provided while redirecting
  if (isRedirecting && fallback) {
    return <>{fallback}</>;
  }
  
  // By default, don't render anything
  return null;
}