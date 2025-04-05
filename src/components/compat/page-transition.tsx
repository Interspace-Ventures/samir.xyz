'use client';

import { useCallback, useEffect, useRef } from 'react';

interface PageTransitionProps {
  /** Optional: Disable the transition effect */
  disabled?: boolean;
  /** Optional: Timeout to wait before triggering transition (in ms) */
  timeout?: number;
}

/**
 * PageTransition Component
 * 
 * This component manages smooth transitions between pages by managing visibility
 * and ensuring all elements load simultaneously instead of piecemeal
 */
export default function PageTransition({
  disabled = false,
  timeout = 50,
}: PageTransitionProps) {
  const initialized = useRef(false);

  const applyTransition = useCallback(() => {
    if (typeof document === 'undefined') return;
    
    try {
      // First mark the document as loading
      document.documentElement.classList.add('rendering');
      
      // Use requestAnimationFrame for optimal timing of visual changes
      requestAnimationFrame(() => {
        // Set a timeout to ensure all elements have time to render
        setTimeout(() => {
          // Page is ready, remove the rendering class to show content
          document.documentElement.classList.remove('rendering');
          document.documentElement.classList.add('render-complete');
          
          // Add fade-in class for smooth appearance
          document.body.classList.add('fade-in');
          
          // Log for debugging
          console.log('Page transition complete, content now visible');
        }, timeout);
      });
    } catch (error) {
      console.error('Error in page transition:', error);
      
      // Failsafe: make sure content is visible
      document.documentElement.classList.remove('rendering');
      document.body.classList.add('fade-in');
    }
  }, [timeout]);

  useEffect(() => {
    // Skip if disabled or already initialized
    if (disabled || initialized.current) return;
    
    // Mark as initialized
    initialized.current = true;
    
    // Apply the transition on component mount
    applyTransition();
    
    // Apply transition on route changes for Next.js
    const handleRouteChange = () => {
      document.documentElement.classList.add('rendering');
      document.body.classList.remove('fade-in');
    };
    
    const handleRouteComplete = () => {
      applyTransition();
    };
    
    // Add listeners for Next.js router events
    if (typeof window !== 'undefined') {
      // Next.js 13+ App Router doesn't have router events
      // so we need a different approach
      
      // Capture navigations from Link components
      document.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const link = target.closest('a');
        
        if (link && 
            link.getAttribute('href') && 
            !link.getAttribute('href')?.startsWith('#') &&
            !link.getAttribute('target')) {
          // This is an internal navigation
          handleRouteChange();
        }
      });
      
      // Listen for popstate events (back/forward navigation)
      window.addEventListener('popstate', handleRouteChange);
    }
    
    return () => {
      // Clean up listeners
      if (typeof window !== 'undefined') {
        window.removeEventListener('popstate', handleRouteChange);
      }
    };
  }, [applyTransition, disabled]);

  // This component doesn't render anything visible
  return null;
}