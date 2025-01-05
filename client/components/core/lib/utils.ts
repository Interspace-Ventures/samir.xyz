import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Utility for link animations
export const linkVariants = {
  initial: { y: 0 },
  hover: { y: -2 },
  transition: { duration: 0.2 }
};