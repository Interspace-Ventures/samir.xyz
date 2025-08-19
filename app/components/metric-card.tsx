'use client';

import { motion } from 'framer-motion';

interface MetricCardProps {
  label: string;
  value: string | number;
  index?: number;
}

/**
 * Reusable MetricCard component for displaying portfolio metrics
 * Uses neobrutalist design with proper hover states
 */
export default function MetricCard({ label, value, index = 0 }: MetricCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className="bg-purple-600 p-4 neobrutalist-shadow hover:neobrutalist-shadow-hover hover:neobrutalist-transform-hover transition-all duration-200 min-h-[80px] flex flex-col justify-center"
    >
      <div className="text-[11px] sm:text-xs text-white/80 mb-2 font-bold uppercase tracking-wide whitespace-nowrap">{label}</div>
      <div className="text-xl sm:text-2xl font-bold text-white">{value}</div>
    </motion.div>
  );
}