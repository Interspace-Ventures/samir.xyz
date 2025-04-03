/**
 * WebView Compatibility Utils
 * 
 * This module provides utilities for detecting and working with WebView environments.
 * It contains enhanced methods for determining whether the current environment is a
 * WebView and provides optimizations for better WebView compatibility.
 */

const DEBUG_WEBVIEW = false; // Set to true for verbose debugging

/**
 * Checks if the current environment is a WebView
 * Uses multiple detection methods for better accuracy
 * 
 * @returns {boolean} True if running in a WebView, false otherwise
 */
export function isWebViewEnvironment(): boolean {
  // Only run in browser environment
  if (typeof window === 'undefined') {
    return false;
  }
  
  const userAgent = window.navigator.userAgent.toLowerCase();
  
  // If DEBUG_WEBVIEW is true, we'll log the details
  if (DEBUG_WEBVIEW) {
    console.log('WebView Detection - User Agent:', userAgent);
    console.log('WebView Detection - navigator:', Object.keys(window.navigator).join(', '));
  }
  
  // Common WebView identifiers in user agent
  const webViewSignatures = [
    // Android WebView
    'wv', // Most reliable identifier for Android WebView
    'android.+webview',
    'android.+wv',
    'crosswalk',
    
    // iOS WebView signatures 
    'crios', // Chrome iOS
    'fxios', // Firefox iOS  
    'mozilla/5.0 (iphone',  // General iOS + not Safari
    
    // General WebView keywords
    'electron',
    'cordova',
    'capacitor',
    'mobileapp',
    'nativeapp',
  ];
  
  // Check for WebView signatures in user agent
  const hasWebViewUserAgent = webViewSignatures.some(signature => 
    userAgent.includes(signature)
  );
  
  // Advanced detection for iOS UIWebView & WKWebView
  const hasIOSWebViewBrowser = /(iPhone|iPod|iPad)(?!.*Safari)/.test(userAgent);
  
  // Check for common WebView properties
  const hasWebViewProperties = !!(
    (window as any).webkit?.messageHandlers || 
    (window as any).Android || 
    (window as any).MSApp || 
    (window as any).ReactNativeWebView
  );
  
  // Check for missing browser-specific features often not in WebViews
  const missingBrowserFeatures = typeof (window as any).orientation !== 'undefined' && 
                                !(window as any).chrome;
  
  // Final result using multiple detection methods
  const result = hasWebViewUserAgent || 
                hasIOSWebViewBrowser || 
                hasWebViewProperties || 
                missingBrowserFeatures;
  
  if (DEBUG_WEBVIEW) {
    console.log('WebView Detection Results:', {
      hasWebViewUserAgent,
      hasIOSWebViewBrowser,
      hasWebViewProperties,
      missingBrowserFeatures,
      finalResult: result
    });
  }
  
  return result;
}

/**
 * Apply WebView-specific optimizations to the page
 * This includes hardware acceleration and visibility fixes
 */
export function applyWebViewOptimizations(): void {
  // Only run in browser environment
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }
  
  // Add a class to the HTML element to target WebView-specific CSS
  if (isWebViewEnvironment()) {
    document.documentElement.classList.add('webview');
    
    // Add WebView-specific styles dynamically
    const styleElement = document.createElement('style');
    styleElement.id = 'webview-optimizations';
    styleElement.textContent = `
      /* WebView-specific optimizations */
      .webview body {
        /* Hardware acceleration boost */
        -webkit-transform: translateZ(0);
        transform: translateZ(0);
        -webkit-overflow-scrolling: touch;
        
        /* Force visibility */
        opacity: 1 !important;
        visibility: visible !important;
        display: block !important;
      }
      
      /* Additional visibility helpers for problematic elements */
      .webview .main-content,
      .webview main,
      .webview .profile-container {
        opacity: 1 !important;
        visibility: visible !important;
        display: block !important;
      }
      
      /* Performance optimizations */
      .webview * {
        -webkit-tap-highlight-color: transparent;
      }
    `;
    
    // Add the style to the head
    document.head.appendChild(styleElement);
    
    if (DEBUG_WEBVIEW) {
      console.log('WebView optimizations applied');
    }
  }
}

/**
 * Helper for WebView redirects
 * Bypasses complex redirect chains for WebViews
 * 
 * @param {string} targetPath The target path to redirect to
 */
export function redirectWebView(targetPath: string): void {
  // Only run in browser environment and only for WebViews
  if (typeof window === 'undefined' || !isWebViewEnvironment()) {
    return;
  }
  
  console.log(`Redirecting WebView to: ${targetPath}`);
  
  // Use direct location change for WebViews
  // setTimeout helps ensure the WebView is ready
  setTimeout(() => {
    window.location.href = targetPath;
  }, 50);
}