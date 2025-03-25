"use client";

import React from "react";
import { VenturesCard } from "./ventures-cards";

interface GridProps {
  ventures: Array<{
    name: string;
    description: string;
    imageUrl: string;
    link: string;
    priority?: boolean;
  }>;
}

// Ultra-simplified grid component with direct CSS styling for maximum reliability
export function VenturesGrid({ ventures }: GridProps) {
  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: `
        .ventures-grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 2rem;
        }
        
        @media (min-width: 640px) {
          .ventures-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (min-width: 1024px) {
          .ventures-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        
        .ventures-grid-item {
          min-height: 320px;
        }
      `}} />
      
      <div className="ventures-grid">
        {ventures.map((venture, index) => (
          <div key={index} className="ventures-grid-item">
            <VenturesCard
              name={venture.name}
              description={venture.description}
              imageUrl={venture.imageUrl}
              link={venture.link}
              priority={venture.priority}
            />
          </div>
        ))}
      </div>
    </div>
  );
}