import VenturesCardShadcn from "./ventures-card-shadcn";
import { Venture } from "../data/ventures";

interface VenturesGridProps {
  ventures: Venture[];
}

/**
 * VenturesGrid component using shadcn styling
 * - Uses Tailwind CSS grid for responsive layout
 * - Consistent styling with the rest of the application
 * - Uses shadcn card components for better design consistency
 */
export default function VenturesGridShadcn({ ventures }: VenturesGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {ventures.map((venture, index) => (
        <div 
          key={venture.name} 
          className="h-full transform transition-all duration-300 hover:translate-y-[-4px]"
        >
          <VenturesCardShadcn
            name={venture.name}
            description={venture.description}
            imagePath={venture.image}
            link={venture.link}
            priority={venture.priority}
          />
        </div>
      ))}
    </div>
  );
}