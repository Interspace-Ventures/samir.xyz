'use client';

/**
 * VentureCard Component
 * 
 * Displays a single venture in a card format with gradient background,
 * logo, description, and link to website.
 */

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Venture } from './ventures-grid';

// Color pairs for gradient backgrounds
const colorPairs = [
  ['from-blue-600', 'to-purple-600'],
  ['from-purple-600', 'to-pink-600'],
  ['from-blue-500', 'to-purple-500'],
  ['from-purple-500', 'to-blue-600'],
  ['from-purple-600', 'to-blue-500'],
  ['from-blue-600', 'to-pink-500'],
  ['from-pink-500', 'to-purple-600'],
  ['from-purple-500', 'to-pink-500'],
];

interface VentureCardProps {
  venture: Venture;
  index: number;
}

/**
 * VentureCard Component - Card for each venture with hover effects
 * 
 * Features:
 * - Fully clickable card that links to venture's website
 * - Description appears on hover
 * - Gradient background based on index
 * - Animated entrance with framer-motion
 */
export default function VentureCard({ venture, index }: VentureCardProps) {
  const colorIndex = index % colorPairs.length;
  const [fromColor, toColor] = colorPairs[colorIndex];
  
  return (
    <motion.a 
      href={venture.website || '#'} 
      target="_blank" 
      rel="noreferrer"
      className={`block w-full h-full absolute inset-0 overflow-hidden group cursor-pointer`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Main visible content - full-sized logo that fills entire space */}
      <div className="absolute inset-0 flex items-center justify-center bg-white/5">
        {venture.logoUrl && (
          <div className="venture-logo flex items-center justify-center w-full h-full">
            <Image 
              src={venture.logoUrl} 
              alt={`${venture.name} logo`}
              width={200}
              height={200}
              className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-95"
              priority
            />
          </div>
        )}
      </div>
      
      {/* Hover overlay with name - description format (top-aligned) */}
      <div className="absolute inset-0 p-3 bg-gradient-to-br from-purple-primary/90 to-bg-primary/90 flex flex-col justify-start pt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out z-10 overflow-hidden">
        <div className="text-white text-sm font-semibold mb-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          {venture.name} - <span className="font-normal">{venture.description}</span>
        </div>
        {/* Always show line separator without animation for consistent display */}
        <div className="w-8 h-0.5 bg-white/40 mb-1 opacity-100 group-hover:opacity-100"></div>
      </div>
    </motion.a>
  );
}