'use client';

import { useEffect, useState } from 'react';
import { isWebViewEnvironment, applyWebViewOptimizations } from '../../utils/webview-compat';
import LoadingFallback from './loading-fallback';

interface WebViewProviderProps {
  children: React.ReactNode;
}

/**
 * WebView Provider Component
 * 
 * Provides WebView detection and optimization for child components
 * Applies WebView-specific optimizations when in a WebView environment
 */
export default function WebViewProvider({ children }: WebViewProviderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isWebView, setIsWebView] = useState(false);
  
  useEffect(() => {
    // Detect if we're in a WebView
    const webViewDetected = isWebViewEnvironment();
    setIsWebView(webViewDetected);
    
    if (webViewDetected) {
      console.log('WebView detected - applying optimizations');
      // Apply WebView-specific optimizations
      applyWebViewOptimizations();
    }
    
    // Mark as loaded after a short delay
    // This helps ensure WebView has fully initialized
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, webViewDetected ? 200 : 0);
    
    return () => clearTimeout(timer);
  }, []);

  // For WebViews, show a loading state until we're ready
  if (isWebView && isLoading) {
    return <LoadingFallback message="Loading your page..." />;
  }
  
  return (
    <>
      {isWebView && (
        <div 
          id="webview-indicator" 
          data-webview="true" 
          style={{ display: 'none' }}
        />
      )}
      {children}
    </>
  );
}