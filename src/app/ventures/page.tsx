"use client"

import { VenturesGrid } from "../../components/ventures/ventures-grid";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { ASSET_PATHS } from "../../config/paths";

/**
 * Main Ventures page
 * - Uses consolidated components for improved maintainability 
 * - Clean implementation with Tailwind CSS
 * - Added dark/light mode support
 */
export default function Ventures() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Handle client side mounting for theme detection
  useEffect(() => {
    setMounted(true);
  }, []);

  // Detect if we're in dark mode for proper styling
  const isDark = mounted && resolvedTheme === 'dark';
  
  // All venture data with consistent image paths using centralized path config
  const ventures = [
    {
      name: "2 Days Early",
      description: "Current and former Chime operator community built by operators for operators",
      imagePath: `${ASSET_PATHS.VENTURES}2de-interspace.png`, // Using centralized path config
      link: "https://2daysearly.com",
      priority: true
    },
    {
      name: "Solo",
      description: "The first design-forward climbing app",
      imagePath: `${ASSET_PATHS.VENTURES}solo-wordmark---gradient-2025.png`, // Using centralized path config
      link: "https://soloclimbing.com",
      priority: true
    },
    {
      name: "Predictive:film",
      description: "AI-powered film predictions",
      imagePath: `${ASSET_PATHS.VENTURES}predictive.film-icon-2025.png`, // Using centralized path config
      link: "https://predictive.film"
    },
    {
      name: "Interspace",
      description: "Over-engineered fintech and stratfin perspectives",
      imagePath: `${ASSET_PATHS.VENTURES}interspace.png`, // Using centralized path config
      link: "https://interspace.sh",
      priority: true
    },
    {
      name: "Hey - I'm Samir",
      description: "I drive business impact in fintech.",
      imagePath: `${ASSET_PATHS.VENTURES}hey-im-samir.png`, // Using centralized path config
      link: "https://heyimsamir.com",
      priority: true
    },
    {
      name: "Perspectives",
      description: "Fintech & stratfin deep dives",
      imagePath: `${ASSET_PATHS.VENTURES}perspectives.png`, // Using centralized path config
      link: "https://perspectives.fyi"
    }
  ];
  
  return (
    <div className="max-w-6xl mx-auto">
      <div className="max-w-4xl mx-auto text-center mb-12 pt-8">
        <h1 className={`text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent font-inter
          ${isDark 
            ? 'bg-gradient-to-r from-purple-300 to-purple-500 dark:purple-neon' 
            : 'bg-gradient-to-r from-purple-500 to-purple-700'}`}
        >
          Interspace Ventures
        </h1>
        <p className={`text-lg max-w-3xl mx-auto font-inter ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
        >
          I create apps and concepts by coding at the speed of thought using Replit.
        </p>
      </div>
      
      <div className="mb-16">
        <VenturesGrid ventures={ventures} />
      </div>
    </div>
  );
}