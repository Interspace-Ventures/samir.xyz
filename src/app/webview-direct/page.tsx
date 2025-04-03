'use client';

import { useEffect } from 'react';
import { applyWebViewOptimizations } from '../../utils/webview-compat';
import LoadingFallback from '../../components/compat/loading-fallback';

/**
 * WebView Direct Access Page
 * 
 * This page is a minimal, ultra-lightweight entry point specifically for WebViews
 * that have issues with server-side redirects. It uses window.location for direct
 * navigation to avoid any potential issues with router-based navigation.
 */
export default function WebViewDirectPage() {
  useEffect(() => {
    try {
      // Log the access
      console.log('WebView direct access page loaded - redirecting to profile');
      
      // Apply WebView optimizations immediately
      applyWebViewOptimizations();
      
      // Mark the document as WebView for any CSS optimizations
      if (typeof document !== 'undefined') {
        document.documentElement.classList.add('webview');
      }
      
      // Use a small timeout to ensure the page has initialized
      // with a fail-safe mechanism
      const redirectTimer = setTimeout(() => {
        // Use direct window.location navigation for maximum compatibility
        window.location.href = '/profile/';
      }, 100);
      
      // Fail-safe: If redirect doesn't happen within 2 seconds, force it
      const failSafeTimer = setTimeout(() => {
        console.log('WebView redirect fail-safe triggered');
        window.location.replace('/profile/');
      }, 2000);
      
      return () => {
        clearTimeout(redirectTimer);
        clearTimeout(failSafeTimer);
      };
    } catch (error) {
      console.error('Error in WebView direct page:', error);
      // Force redirect even if there's an error
      if (typeof window !== 'undefined') {
        window.location.href = '/profile/';
      }
    }
  }, []);
  
  // Use our optimized loading fallback component
  return <LoadingFallback message="Accessing profile..." />;
}