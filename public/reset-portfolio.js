/**
 * Version v4.8.0 - Enhanced Portfolio Grid Reset Script with Force Refresh Functionality
 * 
 * This improved script respects custom styling while helping fix rendering issues with the portfolio grid.
 * It uses a powerful approach that forces proper styles through multiple methods while preserving animations.
 * Updated: 2025-03-30
 */

(function() {
  console.log('Portfolio reset script v4.8.0 with advanced force refresh loaded');
  
  // Version timestamp to ensure we're running the latest script (cache busting)
  const VERSION = 'v4.8.0-' + Date.now();
  console.log('Script version timestamp:', VERSION);
  
  // Force clear CSS caches by adding a dynamic stylesheet
  function forceClearStyleCache() {
    const style = document.createElement('style');
    style.textContent = `
      /* Force-refresh cache buster: ${VERSION} */
      .portfolio-grid { display: grid !important; }
      .portfolio-motto { display: inline-block !important; }
      .portfolio-grid > div > div > a { display: block !important; }
      .portfolio-grid div[class*="absolute inset-0"] { position: absolute !important; }
      .portfolio-grid .absolute.top-2.right-2 { position: absolute !important; }
    `;
    document.head.appendChild(style);
    console.log('Dynamic style with cache busting injected');
  }
  
  // Run immediately
  forceClearStyleCache();
  
  // Wait for DOM to be fully loaded
  document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - preparing portfolio grid with gray theming');
    setTimeout(resetPortfolioGridGently, 200);
    setTimeout(enhanceLogoDisplayPreservingStyles, 250);
    
    // Make sure all hover effects and animations are preserved
    setTimeout(preserveAnimationsAndHoverEffects, 300);
  });

  // Also run on window load to ensure images are loaded
  window.addEventListener('load', function() {
    console.log('Window loaded - ensuring portfolio grid with gray theming is applied');
    resetPortfolioGridGently();
    enhanceLogoDisplayPreservingStyles();
    preserveAnimationsAndHoverEffects();
    
    // Run twice more with delays to ensure everything is properly applied
    setTimeout(() => {
      resetPortfolioGridGently();
      enhanceLogoDisplayPreservingStyles();
      preserveAnimationsAndHoverEffects();
      console.log('Portfolio grid final styling check complete');
    }, 1000);
  });

  function resetPortfolioGridGently() {
    const portfolioGrid = document.querySelector('.portfolio-grid');
    
    if (!portfolioGrid) {
      console.log('Portfolio grid not found - will try again later');
      return;
    }

    // Force a gentle layout recalculation that doesn't override custom styles
    if (!portfolioGrid.classList.contains('gentle-reset-applied')) {
      console.log('Applying gentle grid reset');
      
      // Use a temporary class instead of directly manipulating display style
      portfolioGrid.classList.add('grid-temp-reflow');
      void portfolioGrid.offsetHeight; // This triggers a reflow
      portfolioGrid.classList.remove('grid-temp-reflow');
      
      // Mark as gently reset
      portfolioGrid.classList.add('gentle-reset-applied');
      portfolioGrid.classList.add('grid-reset');
      
      // Only set these grid styles if they aren't already set by React
      if (!portfolioGrid.style.gridTemplateColumns) {
        portfolioGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(220px, 1fr))';
        portfolioGrid.style.gridAutoRows = '130px';
        portfolioGrid.style.gap = '1.25rem'; // Consistent spacing for both row and column gaps
        portfolioGrid.style.width = '94%';
        portfolioGrid.style.maxWidth = '1400px';
        portfolioGrid.style.margin = '0 auto';
      }
    }
    
    // Preserve visibility of cards without changing other custom styles
    const cards = portfolioGrid.querySelectorAll('.portfolio-grid > div');
    cards.forEach(card => {
      // Only fix opacity for invisible cards
      const computedStyle = window.getComputedStyle(card);
      if (parseFloat(computedStyle.opacity) < 0.5) {
        card.style.opacity = '1';
      }
      
      // No other style changes to preserve gray styling
    });
    
    console.log('Portfolio grid has been gently reset while preserving custom gray styling');
  }

  function enhanceLogoDisplayPreservingStyles() {
    // Find all company logo images that need enhancement
    const companyLogos = document.querySelectorAll('.portfolio-grid img:not(.styled-v4)');
    
    if (companyLogos.length === 0) {
      // If all logos are already enhanced, we can skip
      return;
    }
    
    console.log(`Enhancing ${companyLogos.length} logo images while preserving styles`);
    
    companyLogos.forEach(img => {
      // Mark this image as styled with our new version marker
      img.classList.add('styled-v4');
      
      // Only set these minimal styles without overriding existing styles
      if (!img.hasAttribute('style') || !img.style.maxHeight) {
        img.style.maxHeight = img.style.maxHeight || '50px';
        img.style.objectFit = img.style.objectFit || 'contain';
        img.style.maxWidth = '90%';
        img.style.display = 'block';
        img.style.margin = '0 auto';
      }
      
      // Add error handling directly to images
      if (!img.hasAttribute('data-error-handled')) {
        img.setAttribute('data-error-handled', 'true');
        
        img.onerror = function() {
          console.log(`Handling error for image: ${img.alt || 'unnamed'}`);
          
          // Only handle white background for image container if needed
          const imgContainer = img.closest('div');
          if (imgContainer && !img.complete) {
            // Check if the container already has a white background from CSS
            const containerStyle = window.getComputedStyle(imgContainer);
            
            if (containerStyle.backgroundColor === 'rgba(0, 0, 0, 0)' || 
                containerStyle.backgroundColor === 'transparent') {
              // Apply background only if not already set
              imgContainer.style.backgroundColor = 'white';
              imgContainer.style.padding = '4px';
              imgContainer.style.borderRadius = '4px';
            }
          }
          
          // Provide text fallback only if image truly failed
          if (!img.complete || img.naturalWidth === 0) {
            const companyName = img.getAttribute('alt');
            
            if (companyName && !img.parentElement.querySelector('.text-fallback')) {
              // Create fallback text element
              const fallback = document.createElement('div');
              fallback.className = 'text-center text-fallback';
              fallback.innerHTML = `
                <h3 style="font-size: 1rem; font-weight: 500; color: #111827;">${companyName}</h3>
              `;
              
              // Replace image with fallback
              if (img.parentElement) {
                img.parentElement.replaceChild(fallback, img);
              }
            }
          }
        };
      }
    });
    
    console.log('Logo display has been enhanced while preserving custom gray styling');
  }
  
  function preserveAnimationsAndHoverEffects() {
    // Find all card elements that need hover effect preservation
    const cards = document.querySelectorAll('.portfolio-grid > div > div:not(.hover-preserved)');
    
    if (cards.length === 0) {
      return;
    }
    
    console.log(`Preserving hover effects and animations for ${cards.length} cards`);
    
    cards.forEach(card => {
      // Mark this card as processed
      card.classList.add('hover-preserved');
      
      // Ensure consistent padding
      const cardLink = card.querySelector('a');
      if (cardLink && !cardLink.hasAttribute('data-padding-fixed')) {
        cardLink.style.padding = '16px';
        cardLink.setAttribute('data-padding-fixed', 'true');
      }
      
      // Find and style status badges
      const badge = card.querySelector('.absolute.top-2.right-2');
      if (badge) {
        badge.classList.add('z-20', 'text-xs', 'px-2.5', 'py-0.5', 'rounded-md', 'text-white', 'bg-gray-800', 'font-semibold', 'shadow-md', 'shadow-gray-900/30', 'animate-fade-in');
        // Remove any purple styling
        badge.classList.remove('bg-purple-700', 'shadow-purple-900/30');
      }
      
      // Find hover overlay elements
      const overlay = card.querySelector('div[class*="absolute inset-0"]');
      
      if (overlay) {
        // Make sure the overlay has our custom class for CSS targeting
        overlay.classList.add('custom-overlay');
        
        // Update to gray gradient if it's still purple
        if (overlay.classList.contains('bg-gradient-to-t') && 
            (overlay.classList.contains('from-purple-900/95') || 
             overlay.classList.contains('to-purple-800/90'))) {
          overlay.classList.remove('from-purple-900/95', 'to-purple-800/90');
          overlay.classList.add('from-gray-900/95', 'to-gray-800/90');
        }
        
        // Improve hover content styling if needed
        const hoverContent = overlay.querySelector('div');
        if (hoverContent) {
          // Add button-like styling to company name
          const companyName = hoverContent.querySelector('h3');
          if (companyName && !companyName.closest('.px-2.py-1.bg-gray-700\\/70')) {
            // Wrap company name in a styled container if not already
            const nameWrapper = document.createElement('div');
            nameWrapper.className = 'px-2 py-1 bg-gray-700/70 rounded mb-2 inline-block';
            companyName.parentNode.insertBefore(nameWrapper, companyName);
            nameWrapper.appendChild(companyName);
          }
          
          // Add visit button if needed
          if (!hoverContent.querySelector('.mt-1.text-xs')) {
            const description = hoverContent.querySelector('p');
            if (description) {
              description.classList.add('mb-2');
              
              // Create visit button after description
              const visitButtonContainer = document.createElement('div');
              visitButtonContainer.className = 'mt-1 text-xs';
              
              const visitButton = document.createElement('span');
              visitButton.className = 'bg-gray-600/70 hover:bg-gray-500/80 px-3 py-1 rounded-full transition-colors';
              
              const companyName = card.querySelector('h3')?.textContent || 'Website';
              visitButton.textContent = `Visit ${companyName} →`;
              
              visitButtonContainer.appendChild(visitButton);
              hoverContent.appendChild(visitButtonContainer);
            }
          }
        }
      }
      
      // Ensure card has animation class but doesn't override existing ones
      if (!card.classList.contains('hover:animate-card-hover')) {
        card.classList.add('hover:animate-card-hover');
      }
      
      // Make sure the card responds properly to hover events
      card.addEventListener('mouseenter', function() {
        if (overlay) {
          // When hovering, make sure overlay is visible without changing other styles
          const currentTransform = overlay.style.transform;
          const currentOpacity = overlay.style.opacity;
          
          if (currentTransform.includes('translateY') || parseFloat(currentOpacity) === 0) {
            overlay.style.transform = 'translateY(0)';
            overlay.style.opacity = '1';
          }
        }
      });
      
      card.addEventListener('mouseleave', function() {
        if (overlay && !overlay.hasAttribute('data-keep-visible')) {
          // Reset overlay state on mouse leave if not forced visible
          overlay.style.transform = 'translateY(8px)';
          overlay.style.opacity = '0';
        }
      });
    });
    
    console.log('Hover effects and animations preserved for all cards');
  }

  // Add a resize handler to maintain grid layout on window resize
  window.addEventListener('resize', function() {
    setTimeout(resetPortfolioGridGently, 100);
    setTimeout(preserveAnimationsAndHoverEffects, 150);
  });
  
  // Log completion of script initialization
  console.log('Portfolio grid enhancement script v4.0 fully initialized');
})();