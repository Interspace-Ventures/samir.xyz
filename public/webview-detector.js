/**
 * Simple WebView Detector
 * This script identifies WebView environments and applies minimal
 * compatibility fixes without disrupting normal functionality.
 */

(function() {
  // Don't run if we're on a special fallback page
  if (window.location.pathname === '/webview-fallback.html') {
    return;
  }
  
  // Store detection result
  let isWebViewEnvironment = false;
  
  // Basic WebView detection function
  function detectWebView() {
    try {
      const ua = navigator.userAgent || '';
      
      // Check for common WebView indicators in UA
      isWebViewEnvironment = /(WebView|wv)/.test(ua) || 
        /Android.*(wv|.NET)/.test(ua) ||
        /iPhone|iPad.*AppleWebKit(?!.*Safari)/.test(ua) ||
        /FB_IAB|FBAN|FBAV|Line|Instagram|NAVER|KAKAOTALK|Electron|Capacitor|Cordova/.test(ua);
      
      // If in WebView, log it and add a flag class to html
      if (isWebViewEnvironment) {
        console.log('WebView environment detected');
        document.documentElement.classList.add('webview');
        
        // Add a data attribute for potential CSS targeting
        document.documentElement.setAttribute('data-webview', 'true');
      }
      
      return isWebViewEnvironment;
    } catch (e) {
      console.error('Error in WebView detection:', e);
      return false;
    }
  }
  
  // Run detection once
  detectWebView();
  
  // Simple check for content visibility after load
  window.addEventListener('load', function() {
    setTimeout(function() {
      // Just ensure main content is visible
      const mainElement = document.querySelector('main');
      if (mainElement && mainElement.offsetHeight === 0) {
        console.log('Main content not visible, applying fixes');
        mainElement.style.display = 'block';
        mainElement.style.visibility = 'visible';
        mainElement.style.opacity = '1';
      }
    }, 500); 
  });
})();