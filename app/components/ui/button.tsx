import { forwardRef } from "react";
import { cn } from "../../lib/utils";

// Define button variants (simplified from original)
const buttonVariants = {
  default: "bg-blue-600 text-white hover:bg-blue-700",
  outline: "border border-gray-300 bg-white hover:bg-gray-100",
  filter: "bg-white border border-gray-300 text-gray-700 font-medium shadow-sm hover:border-[#5239cc] hover:text-[#5239cc] transition-all duration-200 data-[state=selected]:bg-[#5239cc] data-[state=selected]:text-white data-[state=selected]:border-[#5239cc] data-[state=selected]:hover:bg-[#3b2aa1] data-[state=selected]:shadow-md",
};

// Define button sizes
const buttonSizes = {
  default: "h-9 px-4 py-2",
  sm: "h-8 rounded-md px-3 text-xs",
  lg: "h-10 rounded-md px-6",
  filter: "min-w-[80px] px-5 py-2 text-base font-medium",
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          buttonVariants[variant],
          buttonSizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };