/**
 * Theme configuration for shadcn/ui
 * 
 * This file defines the available themes and color schemes for the application
 * following the shadcn/ui theming approach.
 */

export const themes = [
  {
    name: "light",
    label: "Light",
    activeColor: "#5239cc", // Primary purple used in the app
    selector: "light",
  },
  {
    name: "dark",
    label: "Dark",
    activeColor: "#5239cc", // Same primary purple in dark mode
    selector: ".dark",
  },
]

export type Theme = (typeof themes)[number]