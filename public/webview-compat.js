/**
 * Enhanced WebView Compatibility Layer
 * 
 * This script provides aggressive compatibility fixes for WebView environments
 * to prevent infinite loading issues. It forces visibility and applies rendering
 * patches without cluttering the main codebase.
 */

(function() {
  // Set flag to indicate compatibility mode is active
  window.__webviewCompatActive = true;
  
  // Force immediate visibility of content before DOM is ready
  function applyEarlyFixes() {
    // Create and inject an emergency style tag
    const emergencyStyles = document.createElement('style');
    emergencyStyles.id = 'webview-emergency-styles';
    emergencyStyles.textContent = `
      /* Force visibility on core elements */
      html, body, main, div, h1, h2, h3, p, span, a {
        visibility: visible !important;
        opacity: 1 !important;
        display: block !important;
      }
      
      /* Ensure inline elements display properly */
      span, a {
        display: inline !important;
      }
      
      /* Fix for react hydration issues */
      [data-reactroot], [data-nextjs-root], #__next {
        visibility: visible !important;
        display: block !important;
        opacity: 1 !important;
      }
      
      /* Fix possible flex issues in WebView */
      .flex {
        display: flex !important;
      }
      
      /* Ensure flex children are visible */
      .flex > * {
        visibility: visible !important;
        opacity: 1 !important;
      }
    `;
    
    // Add to head immediately
    if (document.head) {
      document.head.appendChild(emergencyStyles);
    }
    // Also add once DOM is ready just to be sure
    document.addEventListener('DOMContentLoaded', function() {
      if (!document.getElementById('webview-emergency-styles')) {
        document.head.appendChild(emergencyStyles);
      }
    });
  }
  
  // Apply more targeted fixes once DOM is ready
  function applyDomReadyFixes() {
    console.log('WebView compatibility: applying DOM-ready fixes');
    
    // Force correct display on all structural elements
    document.documentElement.style.display = 'block';
    document.documentElement.style.visibility = 'visible';
    document.documentElement.style.opacity = '1';
    
    if (document.body) {
      document.body.style.display = 'block';
      document.body.style.visibility = 'visible';
      document.body.style.opacity = '1';
    }
    
    // Force Next.js root elements to be visible
    const nextRoot = document.getElementById('__next');
    if (nextRoot) {
      nextRoot.style.display = 'block';
      nextRoot.style.visibility = 'visible';
      nextRoot.style.opacity = '1';
    }
    
    // Force all content areas to be visible
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.style.display = 'block';
      mainContent.style.visibility = 'visible';
      mainContent.style.opacity = '1';
    }
    
    // Ensure text content and interactive elements are visible
    const allElements = document.querySelectorAll('div, h1, h2, h3, p, span, a, button, input, nav, header, footer, section, article');
    allElements.forEach(el => {
      const currentDisplay = window.getComputedStyle(el).display;
      // Keep flex if it's already flex
      if (currentDisplay.includes('flex')) {
        el.style.display = 'flex';
      } 
      // Keep inline elements inline
      else if (currentDisplay === 'inline' || el.tagName === 'SPAN' || el.tagName === 'A') {
        el.style.display = 'inline';
      }
      // For all others, ensure block display
      else {
        el.style.display = 'block';
      }
      
      el.style.visibility = 'visible';
      el.style.opacity = '1';
    });
    
    console.log('WebView compatibility: DOM-ready fixes applied');
  }
  
  // Fix possible hydration issues
  function fixHydrationIssues() {
    console.log('WebView compatibility: fixing possible hydration issues');
    
    // Force all interactive elements to be enabled
    const interactiveElements = document.querySelectorAll('button, a, input, select');
    interactiveElements.forEach(el => {
      el.removeAttribute('disabled');
      el.removeAttribute('aria-hidden');
      el.style.pointerEvents = 'auto';
    });
    
    // Check if any core content is still hidden and force display
    const contentAreas = document.querySelectorAll('main, article, section, [role="main"]');
    contentAreas.forEach(el => {
      if (el.offsetHeight === 0 || window.getComputedStyle(el).display === 'none') {
        console.log('Found hidden content area, forcing display:', el);
        el.style.display = 'block';
        el.style.visibility = 'visible';
        el.style.opacity = '1';
        el.style.height = 'auto';
        el.style.overflow = 'visible';
      }
    });
    
    console.log('WebView compatibility: hydration fixes applied');
  }
  
  // Apply all fixes in sequence
  function applyAllFixes() {
    // Apply immediate fixes
    applyEarlyFixes();
    
    // Apply DOM-ready fixes
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', applyDomReadyFixes);
    } else {
      applyDomReadyFixes();
    }
    
    // Fix hydration issues after a short delay
    setTimeout(fixHydrationIssues, 300);
    
    // Apply final fixes after page should be fully loaded
    setTimeout(function() {
      fixHydrationIssues();
      console.log('WebView compatibility: all fixes applied');
    }, 1000);
  }
  
  // Provide a helper for checking WebView compatibility
  window.checkWebViewCompatibility = function() {
    return window.__webviewCompatActive === true;
  };
  
  // Apply all fixes immediately
  applyAllFixes();
})();