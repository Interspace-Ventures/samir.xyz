'use client';

import { motion } from 'framer-motion';

interface MetricCardProps {
  label: string;
  value: string | number;
  index?: number;
}

/**
 * Reusable MetricCard component for displaying portfolio metrics
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
      className="neo-card bg-purple-600 p-4 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300"
    >
      <div className="text-xs sm:text-sm text-white/80 mb-2 font-bold uppercase tracking-wider">{label}</div>
      <div className="text-xl sm:text-2xl font-bold text-white">{value}</div>
    </motion.div>
  );
}