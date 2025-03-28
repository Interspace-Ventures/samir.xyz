/**
 * Enhanced Portfolio Grid Reset Script
 * 
 * This script helps fix rendering issues with the portfolio grid
 * by forcing a layout recalculation when the page loads.
 * It also ensures proper logo display with consistent sizing.
 */

(function() {
  // Wait for DOM to be fully loaded
  document.addEventListener('DOMContentLoaded', function() {
    setTimeout(resetPortfolioGrid, 200);
    setTimeout(enhanceLogoDisplay, 250);
  });

  // Also run on window load to ensure images are loaded
  window.addEventListener('load', function() {
    resetPortfolioGrid();
    enhanceLogoDisplay();
    // Additional reset after a delay to handle any late-loading images
    setTimeout(resetPortfolioGrid, 1000);
  });

  function resetPortfolioGrid() {
    const portfolioGrid = document.querySelector('.portfolio-grid');
    
    if (!portfolioGrid) return;

    // Force a layout recalculation
    portfolioGrid.style.display = 'none';
    void portfolioGrid.offsetHeight; // This triggers a reflow
    portfolioGrid.style.display = 'grid';

    // Add a class to indicate grid has been reset
    portfolioGrid.classList.add('grid-reset');

    // Apply specific grid styles to ensure proper column layout
    portfolioGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(220px, 1fr))';
    portfolioGrid.style.gridAutoRows = '130px';
    portfolioGrid.style.gap = '1rem';
    portfolioGrid.style.width = '100%';
    portfolioGrid.style.maxWidth = '1400px';
    portfolioGrid.style.margin = '0 auto';
    
    // Ensure all cards are visible and properly sized
    const cards = portfolioGrid.querySelectorAll('.portfolio-grid > div');
    cards.forEach(card => {
      card.style.opacity = '1';
      
      // Ensure each card's child element (company card) fills the space
      const companyCard = card.querySelector('div');
      if (companyCard) {
        companyCard.style.height = '100%';
        companyCard.style.backgroundColor = 'white';
        companyCard.style.border = '1px solid #f3f4f6';
      }
    });
    
    console.log('Portfolio grid has been reset for better rendering');
  }

  function enhanceLogoDisplay() {
    // Find all company logo images
    const companyLogos = document.querySelectorAll('.portfolio-grid img');
    
    companyLogos.forEach(img => {
      // Ensure images have proper sizing constraints
      img.style.maxWidth = '100%';
      img.style.maxHeight = '40px';
      img.style.objectFit = 'contain';
      img.style.margin = '0 auto';
      img.style.display = 'block';
      
      // Add error handling directly to images
      img.onerror = function() {
        // Create a parent div with proper white background
        const imgContainer = img.closest('div');
        if (imgContainer) {
          imgContainer.style.backgroundColor = 'white';
          imgContainer.style.padding = '4px';
          imgContainer.style.borderRadius = '4px';
        }
        
        // If image still fails, use the alt text as fallback
        if (!img.complete || img.naturalWidth === 0) {
          const companyName = img.getAttribute('alt');
          
          // Create fallback text element
          const fallback = document.createElement('div');
          fallback.className = 'text-center';
          fallback.innerHTML = `
            <h3 style="font-size: 1rem; font-weight: 500; color: #111827;">${companyName}</h3>
          `;
          
          // Replace image with fallback
          if (img.parentElement) {
            img.parentElement.replaceChild(fallback, img);
          }
        }
      };
    });
    
    console.log('Logo display has been enhanced');
  }

  // Add a resize handler to maintain grid layout on window resize
  window.addEventListener('resize', function() {
    setTimeout(resetPortfolioGrid, 100);
    setTimeout(enhanceLogoDisplay, 150);
  });
})();