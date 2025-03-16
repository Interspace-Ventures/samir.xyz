"use client"

import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"

// Enhanced performance monitoring with timing details and error tracking
const logTransitionPerformance = (action: string, path: string | null, markName?: string) => {
  const timestamp = performance.now();
  if (markName) {
    try {
      performance.mark(markName);
    } catch (error) {
      console.error(`[Navigation] Failed to create performance mark: ${error}`);
    }
  }
  console.log(`[Navigation] ${action} to ${path ?? 'unknown'} at ${timestamp.toFixed(2)}ms`);
};

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const mountTimeRef = useRef(performance.now())
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Enhanced mount monitoring with error handling
  useEffect(() => {
    try {
      const mountDuration = performance.now() - mountTimeRef.current;
      const markName = `transition-start-${pathname}`;

      setIsTransitioning(true);
      console.log(`[PageTransition] Mounting component for path: ${pathname}`);
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
        }
      };
    } catch (error) {
      console.error('[PageTransition] Error during mount:', error);
      setIsTransitioning(false);
    }
  }, [pathname]);

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