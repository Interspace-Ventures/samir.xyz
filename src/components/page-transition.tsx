"use client"

import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

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
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}