'use client';

/**
 * Portfolio Page Component
 * 
 * Refactored portfolio page using the new component architecture.
 * Provides clean, performant portfolio display with consistent styling.
 */

import { motion } from 'framer-motion';
import { PortfolioGrid } from '../../components/portfolio/portfolio-grid';
import MetricsSummaryStandalone from '../components/metrics-summary-standalone';
import { fadeInUp } from '../../lib/utils/animations';

export default function PortfolioPage() {
  return (
    <div className="pt-20 pb-16">
      <section className="section">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1 
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
          >
            Portfolio
          </motion.h1>
          
          {/* Investment Philosophy */}
          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            className="content-card mb-8 font-medium"
          >
            I have advised and invested in ambitious teams building innovative products who focus on unit economics optimized business models since 2019.
          </motion.div>
          
          {/* Metrics load instantly with static data */}
          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <MetricsSummaryStandalone />
          </motion.div>
          
          {/* Use the new optimized portfolio grid */}
          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
            className="mt-8"
          >
            <PortfolioGrid />
          </motion.div>
        </div>
      </section>
    </div>
  );
}