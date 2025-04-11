import * as React from "react";
import { cn } from "../../../lib/utils";

interface FilterButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

const FilterButton = React.forwardRef<HTMLButtonElement, FilterButtonProps>(
  ({ className, active, children, ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap border border-gray-300 bg-white text-black text-lg rounded px-4 py-1 font-normal shadow transition-colors",
          active 
            ? "bg-[#5239cc] text-white border-[#5239cc]" 
            : "hover:bg-gray-100",
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