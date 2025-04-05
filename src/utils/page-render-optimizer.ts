/**
 * Page Render Optimizer
 * 
 * Provides utilities for optimizing page rendering and preventing piecemeal loading
 * Helps ensure all content renders together for a smoother user experience
 */

/**
 * Controls rendering to ensure content appears all at once
 */
export function optimizePageRendering(): void {
  // Skip if not in browser environment
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }

  try {
    // Start with rendering class to hide content
    document.documentElement.classList.add('rendering');
    
    // Remove rendering class after everything has loaded
    const completeLoading = () => {
      // Use requestAnimationFrame to ensure the browser has had time to paint
      requestAnimationFrame(() => {
        document.documentElement.classList.remove('rendering');
        document.documentElement.classList.add('render-complete');
      });
    };

    // If content is already loaded, render immediately
    if (document.readyState === 'complete') {
      completeLoading();
    } else {
      // Wait for everything to load before showing content
      window.addEventListener('load', completeLoading);
    }

    // Failsafe to ensure content eventually appears even if load event doesn't fire
    setTimeout(completeLoading, 1000);
  } catch (error) {
    console.error('Error in page render optimization:', error);
    
    // Failsafe: ensure content is visible regardless of error
    document.documentElement.classList.remove('rendering');
  }
}

/**
 * Optimizes theme transitions to prevent flashing or content shifts
 */
export function optimizeThemeTransitions(): void {
  // Skip if not in browser environment
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }

  try {
    // Detect theme change events
    const handleThemeChange = () => {
      // Add no-transition class to prevent animations during theme change
      document.documentElement.classList.add('no-transition');
      
      // Remove the class after a short delay to restore animations
      setTimeout(() => {
        document.documentElement.classList.remove('no-transition');
      }, 100);
    };

    // Watch for theme class changes on html element
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'class' &&
          (mutation.target as Element).classList.contains('dark') !== 
          (mutation.oldValue || '').includes('dark')
        ) {
          handleThemeChange();
        }
      });
    });

    // Start observing the html element
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
      attributeOldValue: true
    });
    
    // Note: We're not returning the cleanup function as this is a void function
    // The observer will be active for the lifetime of the page
  } catch (error) {
    console.error('Error in theme transition optimization:', error);
  }
}

/**
 * Main function to apply all page rendering optimizations
 */
export function applyAllRenderingOptimizations(): void {
  // Optimize page rendering
  optimizePageRendering();
  
  // Optimize theme transitions
  optimizeThemeTransitions();
}

// Export a function to initialize all optimizations
export default function initPageOptimizer(): void {
  if (typeof window !== 'undefined') {
    // Run immediately
    applyAllRenderingOptimizations();
    
    // Also run on route changes for single-page apps
    document.addEventListener('DOMContentLoaded', applyAllRenderingOptimizations);
  }
}