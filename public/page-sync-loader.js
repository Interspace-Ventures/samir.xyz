/**
 * Page Sync Loader
 * 
 * This script ensures all page content loads simultaneously
 * instead of in a piecemeal fashion.
 * 
 * It adds a rendering class to the HTML element while the page
 * is loading, and removes it once everything is loaded.
 */

(function() {
  // Add rendering class to hide content while loading
  document.documentElement.classList.add('rendering');
  
  function completeLoading() {
    requestAnimationFrame(function() {
      // Remove rendering class to show content
      document.documentElement.classList.remove('rendering');
      document.documentElement.classList.add('render-complete');
      
      // No longer adding fade-in class to prevent hydration errors
      
      console.log('[PageSyncLoader] Content now visible');
    });
  }
  
  // Wait for complete page load
  if (document.readyState === 'complete') {
    completeLoading();
  } else {
    window.addEventListener('load', completeLoading);
  }
  
  // Failsafe timeout to ensure content eventually appears
  setTimeout(completeLoading, 1000);
})();