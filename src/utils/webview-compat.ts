/**
 * WebView Compatibility Utilities
 * 
 * This module provides clean, standardized approaches for ensuring compatibility
 * across standard browsers and WebView environments without using aggressive
 * techniques or bad practices.
 */

/**
 * Detects if the current environment is a WebView using standards-compliant checks
 */
export function isWebViewEnvironment(): boolean {
  if (typeof window === 'undefined') return false;
  
  try {
    // Standard WebView detection for Android
    const hasWebViewAgent = 
      navigator.userAgent.includes('wv') || 
      navigator.userAgent.includes('WebView');
    
    // iOS standalone mode detection
    // Use a safe approach that works with TypeScript
    let isIOSStandalone = false;
    try {
      // @ts-ignore - Safari-specific property for home screen apps
      isIOSStandalone = window.navigator.standalone === true;
    } catch (e) {
      // Silently fail if the property doesn't exist
    }
    
    // PWA display mode detection
    const isPWA = window.matchMedia('(display-mode: standalone)').matches;
    
    return hasWebViewAgent || isIOSStandalone || isPWA;
  } catch (e) {
    // Safe fallback if any detection fails
    return false;
  }
}

/**
 * Applies WebView-specific optimizations using standards-compliant CSS
 * This is meant to be called client-side only
 */
export function applyWebViewOptimizations(): void {
  if (typeof document === 'undefined') return;
  
  if (isWebViewEnvironment()) {
    // Apply WebView-specific class for targeting in CSS
    document.documentElement.classList.add('webview');
  }
}

/**
 * Applies system theme detection
 * This is meant to be called client-side only
 */
export function applySystemTheme(): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  
  try {
    const prefersDarkMode = window.matchMedia && 
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (prefersDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Add listener for theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (e.matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    });
  } catch (e) {
    // Silent fallback for older browsers
  }
}