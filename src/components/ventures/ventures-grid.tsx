"use client";

import React from "react";
import { VenturesCard } from "./ventures-card";

interface Venture {
  name: string;
  description: string;
  imagePath: string;
  link: string;
  priority?: boolean;
}

interface VenturesGridProps {
  ventures: Venture[];
}

/**
 * Consolidated VenturesGrid component
 * - Uses Tailwind CSS grid for responsive layout
 * - Consistent styling with the rest of the application
 * - Clean implementation without inline styles
 */
export function VenturesGrid({ ventures }: VenturesGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {ventures.map((venture, index) => (
        <div 
          key={index} 
          className="h-full transform transition-all duration-300 hover:translate-y-[-4px]"
          style={{ fontFamily: 'Inter, sans-serif' }} // Ensure consistent font
        >
          <VenturesCard
            name={venture.name}
            description={venture.description}
            imagePath={venture.imagePath}
            link={venture.link}
            priority={venture.priority}
          />
        </div>
      ))}
    </div>
  );
}