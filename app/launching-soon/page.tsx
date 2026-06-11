'use client';

import { motion } from 'framer-motion';

export default function LaunchingSoon() {
  return (
    <div className="pt-8 pb-16">
      <section className="section">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-6">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-4xl md:text-5xl font-bold mb-6 text-white"
            >
              Launching Soon
            </motion.h1>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="content-card mb-10 font-medium"
          >
            Something exciting is coming. We're putting the finishing touches on this venture.
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <a
              href="/ventures"
              className="inline-flex items-center space-x-2 bg-[#7f54dc] hover:bg-[#6a3fd4] text-white px-6 py-3 font-medium transition-colors duration-200 rounded-lg"
            >
              ← Back to Ventures
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}