"use client";

import React, { useEffect, useState } from 'react';

interface ClientCompatWrapperProps {
  children: React.ReactNode;
}

// Define window with custom properties for WebView detection
declare global {
  interface Window {
    webkit?: { messageHandlers?: unknown };
    Android?: unknown;
    MSApp?: unknown;
    ReactNativeWebView?: unknown;
  }
}

/**
 * ClientCompatWrapper provides client-side compatibility features
 * based on the user's browser and environment
 */
export default function ClientCompatWrapper({ children }: ClientCompatWrapperProps) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    
    // Detect WebView environments
    const userAgent = navigator.userAgent.toLowerCase();
    const isWebView = 
      userAgent.includes('wv') || 
      (/(iphone|ipod|ipad)/.test(userAgent) && !userAgent.includes('safari')) ||
      userAgent.includes('electron') ||
      !!window.webkit?.messageHandlers ||
      !!window.Android ||
      !!window.MSApp ||
      !!window.ReactNativeWebView;
    
    if (isWebView) {
      document.documentElement.classList.add('webview');
      
      // Apply WebView-specific optimizations
      if (document.body) {
        // Hardware acceleration
        document.body.style.transform = 'translateZ(0)';
        
        // Apply iOS-specific styles with type assertion
        const bodyStyle = document.body.style as any;
        if (bodyStyle) {
          bodyStyle.webkitOverflowScrolling = 'touch';
          bodyStyle.webkitTransform = 'translateZ(0)';
        }
      }
    }
    
    // Add class to indicate JS is available (used for progressive enhancement)
    document.documentElement.classList.add('js-enabled');
    document.documentElement.classList.remove('no-js');
  }, []);
  
  if (!mounted) {
    // Return a placeholder while client-side code initializes
    // This prevents hydration mismatch errors
    return <div id="client-wrapper-loading" aria-hidden="true" />;
  }
  
  return <>{children}</>;
}