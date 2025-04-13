import * as React from "react";
import styles from "./filter-button.module.css";
import { cn } from "../../../lib/utils";

interface FilterButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

const FilterButton = React.forwardRef<HTMLButtonElement, FilterButtonProps>(
  ({ className, active, children, ...props }, ref) => {
    return (
      <button
        className={cn(
          styles.filterButton,
          active && styles.filterButtonActive,
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