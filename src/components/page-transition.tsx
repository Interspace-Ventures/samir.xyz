"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"

// Performance monitoring
const logTransitionPerformance = (action: string, path: string | null) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Navigation] ${action} to ${path ?? 'unknown'}: ${performance.now()}ms`);
  }
};

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Monitor page transitions
  useEffect(() => {
    logTransitionPerformance('transition-start', pathname);
    return () => logTransitionPerformance('transition-complete', pathname);
  }, [pathname]);

  return (
    <div
      key={pathname}
      className="animate-in fade-in slide-in-from-bottom-4 duration-300 w-full h-full"
      style={{
        willChange: 'opacity, transform',
        isolation: 'isolate',
      }}
      onTransitionStart={() => logTransitionPerformance('transition-start', pathname)}
      onTransitionEnd={() => logTransitionPerformance('transition-complete', pathname)}
    >
      {children}
    </div>
  )
}