import * as React from "react";
import { cn } from "../config/utils";

const badgeVariants = {
  default: "border-transparent bg-purple-700 text-white",
  secondary: "border-transparent bg-gray-500 text-white",
  outline: "text-foreground",
  success: "border-transparent bg-green-500 text-white",
  warning: "border-transparent bg-yellow-500 text-white",
  destructive: "border-transparent bg-red-500 text-white",
};

type VariantType = keyof typeof badgeVariants;

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: VariantType;
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variantClass = badgeVariants[variant] || badgeVariants.default;
  
  return (
    <div 
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium transition-colors",
        variantClass,
        className
      )} 
      {...props} 
    />
  );
}

export { Badge, badgeVariants };