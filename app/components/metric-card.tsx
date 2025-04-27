'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

type MetricCardProps = {
  label: string;
  value: string | number;
};

/**
 * MetricCard Component
 * 
 * This component displays a single metric in a card format
 * with animation effects for a better user experience.
 */
export default function MetricCard({ label, value }: MetricCardProps) {
  const [animated, setAnimated] = useState(false);
  
  useEffect(() => {
    // Delay animation slightly for a staggered effect
    const timer = setTimeout(() => {
      setAnimated(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={animated ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <span className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">{label}</span>
      <span className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
        {value}
      </span>
    </motion.div>
  );
}