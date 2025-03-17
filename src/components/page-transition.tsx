"use client"

import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"

// Enhanced performance monitoring with timing details and error tracking
const logTransitionPerformance = (action: string, path: string | null, markName?: string) => {
  try {
    const timestamp = performance.now();
    if (markName) {
      try {
        performance.mark(markName);
      } catch (error) {
        console.error(`[Navigation] Failed to create performance mark:`, error);
      }
    }
    console.log(`[Navigation] ${action} to ${path ?? 'unknown'} at ${timestamp.toFixed(2)}ms`);
  } catch (error) {
    console.error('[Navigation] Error in performance logging:', error);
  }
};

export function PageTransition({ children }: { children: React.ReactNode }) {
  // Initialize all hooks at the top level
  const pathname = usePathname()
  const mountTimeRef = useRef<number>(performance.now())
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [hasError, setHasError] = useState(false)

  // Enhanced mount monitoring with error handling
  useEffect(() => {
    if (!pathname) {
      console.error('[PageTransition] pathname is undefined');
      return;
    }

    try {
      const mountDuration = performance.now() - mountTimeRef.current;
      const markName = `transition-start-${pathname}`;

      setIsTransitioning(true);
      setHasError(false);

      console.log(`[PageTransition] Component context:`, {
        pathname,
        mountDuration: `${mountDuration.toFixed(2)}ms`,
        transitionState: isTransitioning,
        hasError,
        timestamp: new Date().toISOString()
      });

      logTransitionPerformance('transition-start', pathname, markName);

      return () => {
        try {
          const unmountTime = performance.now();
          logTransitionPerformance('transition-complete', pathname);
          console.log(`[PageTransition] Component lifecycle duration: ${(unmountTime - mountTimeRef.current).toFixed(2)}ms`);

          if (performance.getEntriesByName(markName).length) {
            performance.measure(`Page Transition - ${pathname}`, markName);
          }
          setIsTransitioning(false);
        } catch (error) {
          console.error('[PageTransition] Error during unmount:', error);
          setHasError(true);
        }
      };
    } catch (error) {
      console.error('[PageTransition] Error during mount:', error);
      setHasError(true);
      setIsTransitioning(false);
    }
  }, [pathname, isTransitioning, hasError]);

  if (hasError) {
    console.error('[PageTransition] Rendering error state');
    return <div>Error during transition</div>;
  }

  return (
    <div
      key={pathname}
      className={`animate-in fade-in duration-300 ease-in-out ${isTransitioning ? 'transitioning' : ''}`}
      style={{
        willChange: 'opacity',
        isolation: 'isolate',
        transform: 'translateZ(0)'
      }}
      onTransitionStart={() => {
        try {
          logTransitionPerformance('animation-start', pathname);
        } catch (error) {
          console.error('[PageTransition] Error during transition start:', error);
        }
      }}
      onTransitionEnd={() => {
        try {
          logTransitionPerformance('animation-complete', pathname);
        } catch (error) {
          console.error('[PageTransition] Error during transition end:', error);
        }
      }}
    >
      {children}
    </div>
  )
}