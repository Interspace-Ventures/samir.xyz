"use client"

import { AnimatePresence, motion } from "framer-motion"
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
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ 
          duration: 0.2,  // Reduced from 0.3 for snappier transitions
          ease: [0.25, 0.1, 0.25, 1], // Custom cubic bezier for smoother motion
        }}
        style={{
          willChange: 'opacity, transform',  // Performance hint for browsers
          isolation: 'isolate',  // Create stacking context for better performance
        }}
        className="w-full h-full"
        onAnimationStart={() => logTransitionPerformance('animation-start', pathname)}
        onAnimationComplete={() => logTransitionPerformance('animation-complete', pathname)}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}