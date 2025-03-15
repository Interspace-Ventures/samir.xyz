"use client"

import { usePathname } from "next/navigation"
import { useEffect, useRef } from "react"

// Enhanced performance monitoring with timing details
const logTransitionPerformance = (action: string, path: string | null, markName?: string) => {
  if (process.env.NODE_ENV === 'development') {
    const timestamp = performance.now();
    if (markName) {
      performance.mark(markName);
    }
    console.log(`[Navigation] ${action} to ${path ?? 'unknown'} at ${timestamp.toFixed(2)}ms`);
  }
};

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const mountTimeRef = useRef(performance.now())

  // Enhanced mount monitoring
  useEffect(() => {
    const mountDuration = performance.now() - mountTimeRef.current;
    const markName = `transition-start-${pathname}`;

    logTransitionPerformance('transition-start', pathname, markName);
    performance.mark(markName);

    console.log(`[Performance] Component mount duration: ${mountDuration.toFixed(2)}ms`);

    return () => {
      const unmountTime = performance.now();
      logTransitionPerformance('transition-complete', pathname);
      console.log(`[Performance] Component total lifecycle: ${(unmountTime - mountTimeRef.current).toFixed(2)}ms`);

      if (performance.getEntriesByName(markName).length) {
        performance.measure(`Page Transition - ${pathname}`, markName);
      }
    };
  }, [pathname]);

  return (
    <div
      key={pathname}
      className="animate-in fade-in duration-300 ease-in-out"
      style={{
        willChange: 'opacity',
        isolation: 'isolate',
        // Remove transform to reduce compositing costs
        transform: 'translateZ(0)'
      }}
      onTransitionStart={() => logTransitionPerformance('animation-start', pathname)}
      onTransitionEnd={() => logTransitionPerformance('animation-complete', pathname)}
    >
      {children}
    </div>
  )
}