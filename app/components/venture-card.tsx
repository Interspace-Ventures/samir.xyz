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
      key={venture.id}
      className={`card-venture bg-gradient-to-br ${fromColor} ${toColor} rounded-xl overflow-hidden relative h-full block group cursor-pointer`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Main visible content */}
      <div className="p-6 h-full flex flex-col relative z-10">
        <div className="flex items-center mb-3">
          {venture.logoUrl && (
            <div className="venture-logo w-14 h-14 mr-3 rounded-md overflow-hidden bg-white/10 flex items-center justify-center p-1">
              <Image 
                src={venture.logoUrl} 
                alt={`${venture.name} logo`}
                width={48}
                height={48}
                className="object-contain"
                priority
              />
            </div>
          )}
          <h3 className="text-xl font-medium text-white leading-tight">{venture.name}</h3>
        </div>
      </div>
      
      {/* Hover overlay with description */}
      <div className="absolute inset-0 p-6 bg-gradient-to-br from-black/80 to-black/70 flex flex-col justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
        <div className="text-white/90 text-base mb-2 font-medium">{venture.name}</div>
        <p className="text-white/80 text-sm">{venture.description}</p>
        
        {venture.founded && (
          <div className="mt-3 text-xs text-white/60">Est. {venture.founded}</div>
        )}
      </div>
    </motion.a>
  );
}