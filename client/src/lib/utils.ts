import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as ToastPrimitives from "@radix-ui/react-toast";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type ToastProps = React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root>;
export type ToastActionElement = React.ReactElement;