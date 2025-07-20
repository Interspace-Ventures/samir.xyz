'use client';

/**
 * Ventures Page Component
 * 
 * Refactored ventures page using the new component architecture.
 * Provides clean, performant ventures display with consistent styling.
 */

import { motion } from 'framer-motion';
import { VenturesGrid } from '../../components/ventures/ventures-grid';
import { fadeInUp } from '../../lib/utils/animations';

export default function VenturesPage() {
  return (
    <div className="pt-20 pb-16">
      <section className="section">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <motion.h1 
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
          >
            Ventures
          </motion.h1>
          
          {/* Philosophy */}
          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            className="content-card mb-10 font-medium"
          >
            I develop apps and design concepts by building at the speed of thought using AI.
          </motion.div>
          
          {/* Use the new optimized ventures grid */}
          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="mt-8"
          >
            <VenturesGrid />
          </motion.div>
        </div>
      </section>
    </div>
  );
}