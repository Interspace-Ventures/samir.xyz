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
    .emergency-navbar {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 80px;
      background-color: #5239cc;
      color: white;
      z-index: 10000;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      font-family: Alexandria, sans-serif;
      display: flex;
      justify-content: center;
    }
    .emergency-navbar-container {
      max-width: 1200px;
      width: 100%;
      height: 100%;
      padding: 0 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
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
  
  // Add the emergency navbar
  function addEmergencyNavbar() {
    const existingNavbar = document.querySelector('.emergency-navbar');
    if (existingNavbar) {
      return; // Don't add it twice
    }
    
    // Create and inject the navbar HTML directly
    const navbar = document.createElement('div');
    navbar.className = 'emergency-navbar';
    navbar.innerHTML = `
      <div class="emergency-navbar-container">
        <div class="emergency-navbar-logo-container">
          <a href="/" style="display: flex; align-items: center; text-decoration: none;">
            <div class="emergency-navbar-logo">
              <span class="emergency-navbar-logo-text">S</span>
            </div>
            <span class="emergency-navbar-wordmark">samir.xyz</span>
          </a>
        </div>
        <div class="emergency-navbar-links">
          <a href="/profile/" class="emergency-navbar-link">ABOUT</a>
          <a href="/portfolio/" class="emergency-navbar-link">PORTFOLIO</a>
          <a href="/ventures/" class="emergency-navbar-link">VENTURES</a>
        </div>
      </div>
    `;
    
    // Insert at the top of the body
    if (document.body.firstChild) {
      document.body.insertBefore(navbar, document.body.firstChild);
    } else {
      document.body.appendChild(navbar);
    }
    
    console.log('[PageSyncLoader] Emergency navbar added');
  }
  
  function completeLoading() {
    requestAnimationFrame(function() {
      // Remove rendering class to show content
      document.documentElement.classList.remove('rendering');
      document.documentElement.classList.add('render-complete');
      
      // Add the emergency navbar
      addEmergencyNavbar();
      
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
  } else {
    // If body doesn't exist yet, wait for it
    document.addEventListener('DOMContentLoaded', addEmergencyNavbar);
  }
})();