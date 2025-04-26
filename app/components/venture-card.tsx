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
      className={`block w-full h-full relative bg-gradient-to-br ${fromColor} ${toColor} overflow-hidden group cursor-pointer`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Main visible content - full-sized logo in center */}
      <div className="absolute inset-0 flex items-center justify-center p-6 bg-white/5">
        {venture.logoUrl && (
          <div className="venture-logo flex items-center justify-center w-[85%] h-[85%]">
            <Image 
              src={venture.logoUrl} 
              alt={`${venture.name} logo`}
              width={200}
              height={200}
              className="object-contain w-auto h-auto max-w-full max-h-full transition-transform duration-300 group-hover:scale-95"
              priority
            />
          </div>
        )}
      </div>
      
      {/* Hover overlay with name - description format */}
      <div className="absolute inset-0 p-6 bg-gradient-to-br from-black/85 to-black/75 flex flex-col justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out z-10">
        <div className="text-white text-xl font-semibold mb-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          {venture.name}
        </div>
        <div className="w-16 h-0.5 bg-white/40 mb-3 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        <p className="text-white/90 text-sm transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75">
          {venture.description}
        </p>
      </div>
    </motion.a>
  );
}