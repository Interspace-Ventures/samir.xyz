import VenturesCard from "./ventures-card";
import { Venture } from "../config/data/ventures";

interface VenturesGridProps {
  ventures: Venture[];
}

/**
 * VenturesGrid component for Remix
 * - Uses Tailwind CSS grid for responsive layout
 * - Consistent styling with the rest of the application
 */
export default function VenturesGrid({ ventures }: VenturesGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {ventures.map((venture, index) => (
        <div 
          key={index} 
          className="h-full transform transition-all duration-300 hover:translate-y-[-4px]"
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