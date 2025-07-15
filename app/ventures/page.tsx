'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import VenturesGridSkeleton from '../components/ventures-grid-skeleton';

// Import the detailed ventures component with optimized loading
const VenturesGridDetailed = dynamic(() => import('../components/ventures-grid-detailed'), {
  ssr: false,
  loading: () => null
});

export default function VenturesPage() {


  return (
    <div className="pt-20 pb-16">
      <section className="section">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-6">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-4xl md:text-5xl font-bold mb-6 text-white"
            >
              Ventures
            </motion.h1>
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="content-card mb-10 font-medium"
          >
            I develop apps and design concepts by building at the speed of thought using AI.
          </motion.div>
          
          {/* Single ventures container with proper min-height to prevent layout shifts */}
          <div className="ventures-container" style={{ minHeight: '480px' }}>
            {/* Content layer - shows detailed content */}
            <div className="content-layer">
              <VenturesGridDetailed />
            </div>
            
            {/* Single skeleton layer that's always the same regardless of content type */}
            <div className="skeleton-layer">
              <VenturesGridSkeleton />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}