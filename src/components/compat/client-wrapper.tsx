"use client";

import React, { useEffect, useState } from 'react';

interface ClientCompatWrapperProps {
  children: React.ReactNode;
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
        // Prevent scrolling issues on iOS WebViews
        document.body.style.webkitOverflowScrolling = 'touch';
        
        // Hardware acceleration
        document.body.style.transform = 'translateZ(0)';
        document.body.style.webkitTransform = 'translateZ(0)';
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