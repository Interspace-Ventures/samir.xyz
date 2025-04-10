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
  
  // Create navbar CSS styles
  const style = document.createElement('style');
  style.innerHTML = `
    /* Fix for white borders */
    html, body {
      margin: 0 !important;
      padding: 0 !important;
      width: 100vw !important;
      max-width: 100vw !important;
      overflow-x: hidden !important;
      box-sizing: border-box !important;
    }
    
    /* Fix for Next.js specific container divs that might add margins */
    body > div, #__next, [data-nextjs-root], div[data-reactroot], div[id^="__next"] {
      margin: 0 !important;
      padding: 0 !important;
      width: 100vw !important;
      max-width: 100vw !important;
      overflow-x: hidden !important;
      box-sizing: border-box !important;
    }
    
    .emergency-navbar {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 80px;
      background-color: #5239cc;
      color: white;
      z-index: 10000;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      font-family: Alexandria, sans-serif;
      display: flex;
      justify-content: center;
      margin: 0;
      padding: 0;
      border-width: 0;
      right: 0;
    }
    .emergency-navbar-container {
      max-width: 1200px;
      width: 100%;
      height: 100%;
      padding: 0 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 auto;
      flex-wrap: nowrap;
    }
    .emergency-navbar-logo-container {
      display: flex;
      align-items: center;
    }
    .emergency-navbar-logo {
      background: linear-gradient(135deg, #4285f4 0%, #8c5ad7 100%);
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      margin-right: 16px;
    }
    .emergency-navbar-logo-text {
      color: white;
      font-size: 24px;
      font-weight: bold;
    }
    .emergency-navbar-wordmark {
      font-size: 24px;
      font-weight: 500;
      color: white;
    }
    .emergency-navbar-links {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      flex-wrap: nowrap;
      flex-shrink: 0;
    }
    .emergency-navbar-link {
      color: white;
      margin: 0 16px;
      font-size: 16px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      text-decoration: none;
    }
    main {
      padding-top: 90px !important;
    }
  `;
  document.head.appendChild(style);
  
  // Styles for emergency footer
  style.innerHTML += `
    .sync-emergency-footer {
      background-color: #5239cc !important;
      color: white !important;
      width: 100vw !important;
      margin: 0 !important;
      padding: 0 !important;
      border-width: 0 !important;
      box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.15) !important;
      font-family: Alexandria, sans-serif !important;
    }
    .sync-emergency-footer a {
      color: white !important;
      text-decoration: none !important;
      font-weight: 500 !important;
    }
    .sync-emergency-footer-content {
      max-width: 1200px !important;
      margin: 0 auto !important;
      padding: 24px !important;
      display: flex !important;
      flex-direction: column !important;
      justify-content: space-between !important;
      align-items: center !important;
    }
    @media (min-width: 768px) {
      .sync-emergency-footer-content {
        flex-direction: row !important;
      }
    }
    .sync-emergency-footer-text {
      color: white !important;
      font-size: 14px !important;
    }
    .sync-emergency-footer-subtext {
      color: rgba(255, 255, 255, 0.8) !important;
      font-size: 12px !important;
    }
  `;
  
  // Emergency navbar removed - using React navbar component only
  function addEmergencyNavbar() {
    // Function intentionally disabled to avoid duplicate navbars
    console.log('[PageSyncLoader] Emergency navbar disabled - using SimplestNavbar component');
    return;
  }
  
  // This function is disabled to prevent duplicate footers
  function addEmergencyFooter() {
    // Function intentionally disabled to avoid duplicate footers
    console.log('[PageSyncLoader] Emergency footer disabled to prevent duplicates');
    return;
  }
  
  function completeLoading() {
    requestAnimationFrame(function() {
      // Remove rendering class to show content
      document.documentElement.classList.remove('rendering');
      document.documentElement.classList.add('render-complete');
      
      // Add the emergency navbar and footer
      addEmergencyNavbar();
      addEmergencyFooter();
      
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
  
  // Add navbar immediately to avoid blank navbar area
  if (document.body) {
    addEmergencyNavbar();
    
    // Add footer with a slight delay to ensure it's at the bottom
    setTimeout(addEmergencyFooter, 200);
  } else {
    // If body doesn't exist yet, wait for it
    document.addEventListener('DOMContentLoaded', () => {
      addEmergencyNavbar();
      setTimeout(addEmergencyFooter, 200);
    });
  }
})();