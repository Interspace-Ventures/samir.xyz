/**
 * Font configuration
 * 
 * This file defines the fonts used in the application,
 * making it easy to maintain and update font choices.
 */

import { Inter, Alexandria } from "next/font/google";

// Configure Inter font
export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// Configure Alexandria font
export const alexandria = Alexandria({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-alexandria",
});

// Font family strings for direct CSS usage
export const fontFamilies = {
  sans: `"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`,
  heading: `"Alexandria", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`,
  mono: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`,
};

// CSS variable names
export const fontVariables = {
  sans: "--font-sans",
  heading: "--font-heading",
  mono: "--font-mono",
};

// Font weights
export const fontWeights = {
  normal: "400",
  medium: "500", 
  semibold: "600",
  bold: "700",
};

// Font sizes with their line heights
export const fontSizes = {
  xs: { size: "0.75rem", lineHeight: "1rem" },
  sm: { size: "0.875rem", lineHeight: "1.25rem" },
  base: { size: "1rem", lineHeight: "1.5rem" },
  lg: { size: "1.125rem", lineHeight: "1.75rem" },
  xl: { size: "1.25rem", lineHeight: "1.75rem" },
  "2xl": { size: "1.5rem", lineHeight: "2rem" },
  "3xl": { size: "1.875rem", lineHeight: "2.25rem" },
  "4xl": { size: "2.25rem", lineHeight: "2.5rem" },
  "5xl": { size: "3rem", lineHeight: "1" },
};