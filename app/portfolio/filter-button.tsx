import * as React from "react";
import { cn } from "../../lib/utils";

interface FilterButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

const FilterButton = React.forwardRef<HTMLButtonElement, FilterButtonProps>(
  ({ className, active, children, ...props }, ref) => {
    return (
      <button
        className={cn(
          "px-4 py-2 rounded-full text-sm font-medium transition-colors border",
          active 
            ? "bg-purple-600 text-white border-purple-600" 
            : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-700",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

FilterButton.displayName = "FilterButton";

export { FilterButton };