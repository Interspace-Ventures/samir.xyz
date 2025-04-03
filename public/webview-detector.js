/**
 * Enhanced WebView Detector and Fallback Handler
 * This script provides immediate detection for problematic WebView environments 
 * and redirects to a simplified fallback solution to prevent infinite loading issues.
 */

(function() {
  // Define max loading time before forcing fallback (ms)
  const MAX_LOAD_TIME = 3000;
  let loadingTimeout;
  let loadTimer = 0;
  let loadingCheckInterval;
  let isWebViewEnvironment = false;
  
  // Don't run detection if already on fallback page or bypass is active
  if (window.location.pathname === '/webview-fallback.html' || 
      window.location.search.includes('bypass_fallback=true')) {
    return;
  }
  
  // Strong WebView detection using multiple approaches
  function detectWebView() {
    try {
      const ua = navigator.userAgent || '';
      
      // Check for common WebView indicators in UA
      isWebViewEnvironment = /(WebView|wv)/.test(ua) || 
        /Android.*(wv|.NET)/.test(ua) ||
        /iPhone|iPad.*AppleWebKit(?!.*Safari)/.test(ua) ||
        /FB_IAB|FBAN|FBAV|Line|Instagram|NAVER|KAKAOTALK|Electron|Capacitor|Cordova/.test(ua);
      
      // Additional runtime checks
      if (!isWebViewEnvironment) {
        // Check for missing navigator features common in browsers but not in WebViews
        if (
          (typeof navigator.serviceWorker === 'undefined') ||
          (typeof navigator.credentials === 'undefined') ||
          (typeof navigator.clipboard === 'undefined')
        ) {
          isWebViewEnvironment = true;
        }
      }
      
      // If in WebView, start monitoring loading progress
      if (isWebViewEnvironment) {
        console.log('WebView environment detected, starting enhanced monitoring');
        startLoadingMonitor();
        injectCompatibilityScript();
      }
    } catch (e) {
      console.error('Error in WebView detection:', e);
      // On detection error, assume it's a WebView to be safe
      isWebViewEnvironment = true;
      startLoadingMonitor();
      injectCompatibilityScript();
    }
  }
  
  // Inject compatibility script
  function injectCompatibilityScript() {
    if (!document.getElementById('webview-compat-script')) {
      console.log('Injecting WebView compatibility script');
      const script = document.createElement('script');
      script.id = 'webview-compat-script';
      script.src = '/webview-compat.js';
      document.head.appendChild(script);
    }
  }
  
  // Start monitoring page loading
  function startLoadingMonitor() {
    // Set a hard timeout for max loading time
    loadingTimeout = setTimeout(function() {
      console.log('Max loading time reached, redirecting to fallback');
      redirectToFallback();
    }, MAX_LOAD_TIME);
    
    // Check loading progress every 250ms
    loadingCheckInterval = setInterval(function() {
      loadTimer += 250;
      checkLoadingProgress();
    }, 250);
    
    // Listen for page load
    window.addEventListener('load', function() {
      // Give a little extra time after load event to verify rendering
      setTimeout(function() {
        finalCheckAfterLoad();
      }, 500);
    });
  }
  
  // Check if loading is progressing normally
  function checkLoadingProgress() {
    try {
      // Check for key elements that should be rendered
      const mainElement = document.querySelector('main');
      const bodyVisible = document.body && 
                         window.getComputedStyle(document.body).display !== 'none';
      
      // If we're in a WebView and elements aren't loading properly after 1 second
      if (isWebViewEnvironment && loadTimer > 1000) {
        // Look for signs of rendering issues
        if (!mainElement || !bodyVisible || 
            (mainElement && (mainElement.offsetHeight === 0 || 
                            window.getComputedStyle(mainElement).display === 'none' ||
                            window.getComputedStyle(mainElement).visibility === 'hidden'))) {
          console.log('Rendering issues detected, redirecting to fallback');
          redirectToFallback();
        }
      }
    } catch (e) {
      console.error('Error checking loading progress:', e);
      // On error, redirect to be safe
      redirectToFallback();
    }
  }
  
  // Final verification after page load
  function finalCheckAfterLoad() {
    clearTimeout(loadingTimeout);
    clearInterval(loadingCheckInterval);
    
    // Only run final check if we're in a WebView
    if (isWebViewEnvironment) {
      try {
        // Test actual content visibility
        const mainElement = document.querySelector('main');
        const h1Element = document.querySelector('h1');
        
        // Check if key content is visible
        if (!mainElement || !h1Element || 
            mainElement.offsetHeight === 0 || 
            h1Element.offsetHeight === 0) {
          console.log('Content not properly rendered after load, redirecting to fallback');
          redirectToFallback();
        }
      } catch (e) {
        console.error('Error in final check:', e);
        redirectToFallback();
      }
    }
  }
  
  // Redirect to the WebView-compatible fallback page
  function redirectToFallback() {
    // Don't redirect if already in progress
    if (window.isRedirectingToFallback) return;
    window.isRedirectingToFallback = true;
    
    // Clean up timers
    clearTimeout(loadingTimeout);
    clearInterval(loadingCheckInterval);
    
    // Redirect to the fallback page
    console.log('Redirecting to WebView-compatible fallback page');
    window.location.href = '/webview-fallback.html';
  }
  
  // Run detection immediately
  detectWebView();
})();