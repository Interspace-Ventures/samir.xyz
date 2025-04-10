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
 * Always renders children to avoid hydration mismatches
 */
export default function WebViewProvider({ children }: WebViewProviderProps) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isWebView, setIsWebView] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  
  useEffect(() => {
    // Detect if we're in a WebView
    try {
      const webViewDetected = isWebViewEnvironment();
      setIsWebView(webViewDetected);
      
      // Only show loading for WebViews after a brief delay
      // This prevents flashing of loading screen for regular browsers
      if (webViewDetected) {
        console.log('WebView detected - applying optimizations');
        // Apply WebView-specific optimizations
        applyWebViewOptimizations();
        
        // Only show loading for WebView after a small delay
        // to prevent unnecessary flashing in regular browsers
        const loadingTimer = setTimeout(() => {
          setShowLoading(true);
        }, 50);
        
        return () => clearTimeout(loadingTimer);
      }
    } catch (error) {
      console.error('Error in WebView detection:', error);
    } finally {
      // Always mark as initialized after detection attempt
      setIsInitialized(true);
    }
  }, []);
  
  return (
    <>
      {/* Always render children first to ensure content is available during hydration */}
      {children}
      
      {/* Add WebView indicator when detected */}
      {isWebView && (
        <div 
          id="webview-indicator" 
          data-webview="true" 
          className="hidden"
        />
      )}
      
      {/* Show loading overlay for WebViews only after initialization and brief delay */}
      {isWebView && showLoading && !isInitialized && (
        <div className="fixed inset-0 z-[9999]">
          <LoadingFallback message="Loading your page..." />
        </div>
      )}
    </>
  );
}