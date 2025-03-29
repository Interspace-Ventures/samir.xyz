/**
 * Version v3.0 - Enhanced Portfolio Grid Reset Script with Purple Styling Preservation
 * 
 * This improved script respects custom styling while helping fix rendering issues with the portfolio grid.
 * It uses a gentle approach that preserves animations, purple accents, and hover effects.
 */

(function() {
  console.log('Portfolio reset script v3.0 with purple theming preservation loaded');
  
  // Version timestamp to ensure we're running the latest script (cache busting)
  const VERSION = Date.now();
  console.log('Script version timestamp:', VERSION);
  
  // Wait for DOM to be fully loaded
  document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - preparing portfolio grid with purple theming');
    setTimeout(resetPortfolioGridGently, 200);
    setTimeout(enhanceLogoDisplayPreservingStyles, 250);
    
    // Make sure all hover effects and animations are preserved
    setTimeout(preserveAnimationsAndHoverEffects, 300);
  });

  // Also run on window load to ensure images are loaded
  window.addEventListener('load', function() {
    console.log('Window loaded - ensuring portfolio grid with purple theming is applied');
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
        portfolioGrid.style.gap = '1rem';
        portfolioGrid.style.width = '100%';
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
      
      // No other style changes to preserve purple styling
    });
    
    console.log('Portfolio grid has been gently reset while preserving custom purple styling');
  }

  function enhanceLogoDisplayPreservingStyles() {
    // Find all company logo images that need enhancement
    const companyLogos = document.querySelectorAll('.portfolio-grid img:not(.styled-v3)');
    
    if (companyLogos.length === 0) {
      // If all logos are already enhanced, we can skip
      return;
    }
    
    console.log(`Enhancing ${companyLogos.length} logo images while preserving styles`);
    
    companyLogos.forEach(img => {
      // Mark this image as styled with our new version marker
      img.classList.add('styled-v3');
      
      // Only set these minimal styles without overriding existing styles
      if (!img.hasAttribute('style') || !img.style.maxHeight) {
        img.style.maxHeight = img.style.maxHeight || '40px';
        img.style.objectFit = img.style.objectFit || 'contain';
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
    
    console.log('Logo display has been enhanced while preserving custom purple styling');
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
      
      // Find hover overlay elements
      const overlay = card.querySelector('div[class*="absolute inset-0"]');
      
      if (overlay) {
        // Make sure the overlay has our custom class for CSS targeting
        overlay.classList.add('custom-overlay');
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
  console.log('Portfolio grid enhancement script v3.0 fully initialized');
})();