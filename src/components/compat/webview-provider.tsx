'use client';

import { useEffect } from 'react';
import { applyWebViewOptimizations, applySystemTheme } from '../../utils/webview-compat';

/**
 * WebViewProvider
 * 
 * A client component that handles WebView compatibility in a clean way.
 * This component doesn't render anything visible but applies necessary
 * optimizations and classes for WebView environments.
 */
export default function WebViewProvider() {
  useEffect(() => {
    // Apply optimizations on the client side
    applyWebViewOptimizations();
    applySystemTheme();
  }, []);

  // This component doesn't render anything visible
  return null;
}