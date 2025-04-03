/**
 * Ultra-Simple WebView Compatibility Layer
 * 
 * This script provides minimal but effective fixes for WebView environments
 * to prevent infinite loading issues. It focuses solely on visibility.
 */

(function() {
  console.log('WebView compatibility layer activated');
  
  // Set flag to indicate compatibility mode is active
  window.__webviewCompatActive = true;
  
  // Apply a simple emergency stylesheet immediately
  function applyEmergencyStyles() {
    const style = document.createElement('style');
    style.textContent = `
      /* Force visibility on all important elements */
      html, body, main, #__next, [id^="__next"], div, header, footer, nav, section, article,
      h1, h2, h3, h4, h5, h6, p, span, a, button, input, img {
        visibility: visible !important;
        opacity: 1 !important;
      }
      
      /* Preserve layout structure while ensuring visibility */
      html, body, main, #__next, [id^="__next"] {
        display: block !important;
      }
      
      /* Ensure flex containers remain flex */
      .flex {
        display: flex !important;
      }
      
      /* Keep grid containers as grid */
      .grid {
        display: grid !important;
      }
      
      /* Keep inline elements as inline */
      span, a {
        display: inline !important;
      }
    `;
    
    // Add to head immediately
    document.head.appendChild(style);
    console.log('WebView emergency styles applied');
  }
  
  // Function to ensure Next.js container is visible
  function ensureNextContainerVisible() {
    const nextContainer = document.getElementById('__next');
    if (nextContainer) {
      nextContainer.style.display = 'block';
      nextContainer.style.visibility = 'visible';
      nextContainer.style.opacity = '1';
      console.log('Next.js container visibility enforced');
    }
  }
  
  // Apply emergency styles immediately
  applyEmergencyStyles();
  
  // Apply fixes on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ensureNextContainerVisible);
  } else {
    ensureNextContainerVisible();
  }
  
  // Apply fixes again after full load to catch any late rendering issues
  window.addEventListener('load', function() {
    setTimeout(ensureNextContainerVisible, 100);
  });
})();