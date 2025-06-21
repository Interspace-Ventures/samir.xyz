'use client';

// Import components for optimized rendering
import { motion } from 'framer-motion';
import MetricsSummaryStandalone from '../components/metrics-summary-standalone';
import IntegratedPortfolioGallery from '../components/integrated-portfolio-gallery';

/**
 * Portfolio Page Component
 * 
 * Uses static metrics data for instant rendering of metrics summary
 * and a simplified portfolio gallery with direct filtering.
 */
export default function PortfolioPage() {
  return (
    <div className="pt-20 pb-16">
      <section className="section">
        <div className="container max-w-6xl">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
          >
            Portfolio
          </motion.h1>
          
          {/* Investment Philosophy */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="content-card mb-8 font-medium"
          >
            I have advised and invested in ambitious teams building innovative products who focus on unit economics optimized business models since 2019.
          </motion.div>
          
          {/* Metrics load instantly with static data */}
          <div className="mb-12">
            <MetricsSummaryStandalone />
          </div>
          
          {/* Use the simplified, direct integrated portfolio gallery */}
          <div className="mt-8">
            <IntegratedPortfolioGallery />
          </div>
        </div>
      </section>
    </div>
  );
}