/*
 * ULTRA AGGRESSIVE WEBVIEW COMPATIBILITY SCRIPT - V2.0
 * 
 * This script ensures that website content is immediately visible in WebView environments
 * It applies multiple layers of enforcement including:
 * 1. Direct style manipulations with !important flags
 * 2. HTML attributes for CSS targeting
 * 3. DOM mutation observations
 * 4. Hydration circumvention
 * 5. Animation/transition prevention
 * 6. Theme flickering prevention
 */

// Set global WebView compatibility flags for the application
window.__NEXT_WEBVIEW_COMPATIBILITY__ = true;
window.__WEBVIEW_CONTENT_VISIBLE__ = false;

// Immediately apply visibility enforcement for WebView
(function() {
  console.log('WebView ultra-compatibility script v2.0: initializing');
  
  // Configure HTML element as soon as possible
  function setupHtmlElement() {
    if (document.documentElement) {
      // Add multiple WebView indicator attributes for CSS targeting
      document.documentElement.setAttribute('data-webview-ready', 'true');
      document.documentElement.setAttribute('data-webview-compatible', 'true');
      document.documentElement.classList.add('webview-compatible');
      
      // Force HTML element to be visible with inline styles
      document.documentElement.setAttribute('style', 
        'visibility: visible !important; ' +
        'opacity: 1 !important; ' + 
        'display: block !important; ' +
        'animation: none !important; ' +
        'transition: none !important; ' +
        'transform: none !important;'
      );
    }
  }
  
  // Apply immediate visibility to all important elements
  function enforceVisibility() {
    // Skip if we've already successfully made content visible
    if (window.__WEBVIEW_CONTENT_VISIBLE__) {
      return;
    }
    
    setupHtmlElement();
    
    if (document.body) {
      // Apply multiple important inline styles for maximum visibility
      document.body.setAttribute('style', 
        'visibility: visible !important; ' +
        'opacity: 1 !important; ' + 
        'display: block !important; ' +
        'animation: none !important; ' +
        'transition: none !important; ' +
        'transform: none !important;'
      );
      
      // Add marker class for CSS targeting
      document.body.classList.add('webview-compatible');
      
      // Ultra-aggressive selector - target absolutely everything that might contain content
      var allContainers = document.querySelectorAll(
        'body > *, ' + 
        '#__next, ' + 
        '#__next > *, ' + 
        'main, ' + 
        'div, ' + 
        'section, ' +
        'header, ' +
        'footer, ' +
        'nav, ' +
        'article, ' +
        'aside, ' +
        '[class*="container"], ' + 
        '[class*="content"], ' + 
        '[class*="wrapper"], ' + 
        '[class*="page"], ' + 
        '[class*="layout"], ' + 
        '.flex-grow'
      );
      
      for (var i = 0; i < allContainers.length; i++) {
        var el = allContainers[i];
        
        // Skip elements that are explicitly meant to be hidden
        if (
          el.classList.contains('hidden') || 
          el.style.display === 'none' ||
          el.hasAttribute('hidden')
        ) {
          continue;
        }
        
        // Force visibility with !important flags
        var originalDisplay = window.getComputedStyle(el).display;
        var displayValue = originalDisplay === 'none' ? 'block' : originalDisplay;
        
        el.setAttribute('style', 
          (el.getAttribute('style') || '') +
          '; visibility: visible !important' +
          '; opacity: 1 !important' + 
          '; display: ' + displayValue + ' !important' +
          '; animation: none !important' +
          '; transition: none !important' +
          '; transform: none !important'
        );
        
        // Add marker class for CSS targeting
        el.classList.add('webview-forced-visible');
      }
      
      // Specifically target any loading indicators and hide them
      var loadingElements = document.querySelectorAll(
        '[class*="loading"], ' +
        '[class*="spinner"], ' +
        '[class*="skeleton"], ' +
        '[class*="theme-provider-loading"], ' +
        '[role="progressbar"]'
      );
      
      for (var j = 0; j < loadingElements.length; j++) {
        loadingElements[j].style.display = 'none';
        loadingElements[j].style.opacity = '0';
        loadingElements[j].style.visibility = 'hidden';
      }
      
      // Mark that we've successfully applied visibility
      window.__WEBVIEW_CONTENT_VISIBLE__ = true;
      console.log('WebView ultra-compatibility: enforced visibility on ' + allContainers.length + ' elements');
    } else {
      // If body isn't available yet, try again immediately
      setTimeout(enforceVisibility, 5); // Even more aggressive retry interval
    }
  }
  
  // Patch all theme-related functions to ensure they don't hide content
  function patchThemeMethods() {
    // Patch next-themes if available
    if (window.next && window.next.themes) {
      try {
        // Backup the original methods
        var original = window.next.themes;
        
        // Override with versions that don't hide content
        window.next.themes = {
          ...original,
          // Ensure the setTheme method doesn't hide content temporarily
          setTheme: function(theme) {
            // Call original but ensure visibility immediately after
            var result = original.setTheme(theme);
            enforceVisibility();
            return result;
          }
        };
        
        console.log('WebView ultra-compatibility: patched next-themes');
      } catch (e) {
        console.error('WebView ultra-compatibility: error patching next-themes', e);
      }
    }
    
    // Patch any global functions that might affect visibility
    try {
      // Override any potential React hydration methods that might hide content
      if (window.__NEXT_HYDRATION) {
        var originalHydration = window.__NEXT_HYDRATION;
        window.__NEXT_HYDRATION = {
          ...originalHydration,
          push: function(...args) {
            // Call original function
            var result = originalHydration.push && originalHydration.push(...args);
            // Then force visibility
            setTimeout(enforceVisibility, 0);
            return result;
          }
        };
        console.log('WebView ultra-compatibility: patched Next hydration');
      }
    } catch (e) {
      console.error('WebView ultra-compatibility: error patching hydration', e);
    }
    
    // Override any animation-related functions
    try {
      // Force all CSS animations to complete immediately
      var styleSheets = document.styleSheets;
      for (var i = 0; i < styleSheets.length; i++) {
        try {
          var sheet = styleSheets[i];
          var rules = sheet.cssRules || sheet.rules;
          if (!rules) continue;
          
          for (var j = 0; j < rules.length; j++) {
            var rule = rules[j];
            if (rule.type === CSSRule.KEYFRAMES_RULE) {
              // This is an animation - force it to its final state
              try {
                // Create a style that forces the animation to its final state
                var styleEl = document.createElement('style');
                styleEl.textContent = '* { animation-duration: 0.001s !important; }';
                document.head.appendChild(styleEl);
              } catch (e) {
                console.error('Error forcing animation to complete', e);
              }
              break; // Once we've added the style, no need to check more rules
            }
          }
        } catch (e) {
          // Security error accessing cross-domain stylesheets - ignore
        }
      }
      console.log('WebView ultra-compatibility: forced animations to complete');
    } catch (e) {
      console.error('WebView ultra-compatibility: error processing animations', e);
    }
  }
  
  // Bypass React hydration completely for WebView
  function bypassHydration() {
    try {
      // Try to find and patch the React root directly
      var reactRoots = document.querySelectorAll('[data-reactroot]');
      for (var i = 0; i < reactRoots.length; i++) {
        reactRoots[i].removeAttribute('data-reactroot');
        reactRoots[i].style.visibility = 'visible';
        reactRoots[i].style.opacity = '1';
      }
      
      // Add attributes to prevent hydration
      document.documentElement.setAttribute('data-no-hydration', 'true');
      if (document.body) {
        document.body.setAttribute('data-no-hydration', 'true');
      }
      
      console.log('WebView ultra-compatibility: attempted to bypass hydration');
    } catch (e) {
      console.error('WebView ultra-compatibility: error bypassing hydration', e);
    }
  }
  
  // Add CSS rules directly to the document for maximum override capability
  function injectForcedCssRules() {
    try {
      var style = document.createElement('style');
      style.textContent = `
        /* Ultra-aggressive WebView compatibility styles */
        html.webview-compatible,
        html[data-webview-ready="true"],
        html[data-webview-compatible="true"],
        body.webview-compatible,
        body.webview-compatible *,
        .webview-forced-visible,
        #__next {
          visibility: visible !important;
          opacity: 1 !important;
          display: revert !important;
          animation: none !important;
          transition: none !important;
          transform: none !important;
        }
        
        /* Hide any loading indicators */
        [class*="loading"],
        [class*="spinner"],
        [class*="skeleton"],
        [role="progressbar"] {
          display: none !important;
          opacity: 0 !important;
          visibility: hidden !important;
        }
      `;
      document.head.appendChild(style);
      console.log('WebView ultra-compatibility: injected forced CSS rules');
    } catch (e) {
      console.error('WebView ultra-compatibility: error injecting CSS', e);
    }
  }
  
  // Create a MutationObserver to watch for any changes that might hide content
  function setupMutationObserver() {
    if (typeof MutationObserver !== 'undefined') {
      try {
        var observer = new MutationObserver(function(mutations) {
          // Force visibility after any DOM changes that might affect visibility
          enforceVisibility();
        });
        
        // Start observing once the document is available
        if (document.documentElement) {
          observer.observe(document.documentElement, { 
            attributes: true, 
            childList: true, 
            subtree: true 
          });
          console.log('WebView ultra-compatibility: MutationObserver started on document');
        }
        
        // Also specifically watch the body once it's available
        if (document.body) {
          observer.observe(document.body, { 
            attributes: true, 
            childList: true, 
            subtree: true 
          });
          console.log('WebView ultra-compatibility: MutationObserver started on body');
        } else {
          // If body isn't available yet, set up a check to observe it later
          var bodyCheckInterval = setInterval(function() {
            if (document.body) {
              observer.observe(document.body, { 
                attributes: true, 
                childList: true, 
                subtree: true 
              });
              console.log('WebView ultra-compatibility: MutationObserver started on body (delayed)');
              clearInterval(bodyCheckInterval);
            }
          }, 10);
        }
      } catch (e) {
        console.error('WebView ultra-compatibility: error setting up MutationObserver', e);
      }
    }
  }
  
  // Define a function to run all compatibility steps in order
  function applyAllCompatibilityMeasures() {
    console.log('WebView ultra-compatibility: applying all measures');
    setupHtmlElement();
    enforceVisibility();
    patchThemeMethods();
    bypassHydration();
    injectForcedCssRules();
    setupMutationObserver();
  }
  
  // Start enforcement immediately with all measures
  applyAllCompatibilityMeasures();
  
  // Also apply when DOM starts loading
  if (document.readyState === 'loading') {
    document.addEventListener('readystatechange', function() {
      applyAllCompatibilityMeasures();
    });
  }
  
  // And apply when DOM is fully loaded
  document.addEventListener('DOMContentLoaded', function() {
    applyAllCompatibilityMeasures();
    console.log('WebView ultra-compatibility: DOMContentLoaded handler fired');
  });
  
  // And when window is fully loaded
  window.addEventListener('load', function() {
    applyAllCompatibilityMeasures();
    console.log('WebView ultra-compatibility: load handler fired');
  });
  
  // Set periodic enforcement as a fallback
  var forcedInterval = setInterval(function() {
    enforceVisibility();
  }, 100); // Check every 100ms as an ultimate fallback
  
  // Run an additional check after a short delay to catch any missed elements
  setTimeout(function() {
    applyAllCompatibilityMeasures();
    console.log('WebView ultra-compatibility: delayed enforcement applied');
  }, 500);
  
  // And a final check after the page should be completely loaded
  setTimeout(function() {
    applyAllCompatibilityMeasures();
    // Clear interval after everything should be loaded
    clearInterval(forcedInterval);
    console.log('WebView ultra-compatibility: final enforcement completed, periodic checks stopped');
  }, 2000);
})();