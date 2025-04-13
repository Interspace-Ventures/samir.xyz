/**
 * Theme configuration for the application
 * 
 * This file defines the available themes and color schemes for the application
 */

export type Theme = {
  name: string;
  label: string;
  value: string;
  colors: {
    background: string;
    foreground: string;
    primary: string;
    secondary: string;
    accent: string;
    muted: string;
    border: string;
  };
};

export const themes = [
  {
    name: "light",
    label: "Light",
    value: "light",
    colors: {
      background: "hsl(0 0% 100%)",
      foreground: "hsl(222.2 84% 4.9%)",
      primary: "hsl(243 75% 59%)",
      secondary: "hsl(210 40% 96.1%)",
      accent: "hsl(210 40% 96.1%)",
      muted: "hsl(210 40% 96.1%)",
      border: "hsl(214.3 31.8% 91.4%)",
    },
  },
  {
    name: "dark",
    label: "Dark",
    value: "dark",
    colors: {
      background: "hsl(222.2 84% 4.9%)",
      foreground: "hsl(210 40% 98%)",
      primary: "hsl(243 75% 59%)",
      secondary: "hsl(217.2 32.6% 17.5%)",
      accent: "hsl(217.2 32.6% 17.5%)",
      muted: "hsl(217.2 32.6% 17.5%)",
      border: "hsl(217.2 32.6% 17.5%)",
    },
  },
  {
    name: "indigo",
    label: "Indigo",
    value: "indigo",
    colors: {
      background: "hsl(0 0% 100%)",
      foreground: "hsl(222.2 84% 4.9%)",
      primary: "hsl(243 75% 59%)",
      secondary: "hsl(243 75% 95%)",
      accent: "hsl(243 75% 90%)",
      muted: "hsl(243 20% 96%)",
      border: "hsl(243 30% 90%)",
    },
  },
  {
    name: "blue",
    label: "Blue",
    value: "blue",
    colors: {
      background: "hsl(0 0% 100%)",
      foreground: "hsl(222.2 84% 4.9%)",
      primary: "hsl(212 100% 47%)",
      secondary: "hsl(212 100% 95%)",
      accent: "hsl(212 100% 90%)",
      muted: "hsl(212 20% 96%)",
      border: "hsl(212 30% 90%)",
    },
  },
] as const;

export type ThemeName = (typeof themes)[number]["name"];

// Default theme to use if no preference is set
export const defaultTheme: ThemeName = "light";

// Function to get a theme by name
export function getTheme(name: ThemeName): Theme {
  return themes.find((theme) => theme.name === name) || themes[0];
}

// Function to get a CSS variable value for a theme
export function getThemeVariable(
  themeName: ThemeName,
  variableName: keyof Theme["colors"]
): string {
  const theme = getTheme(themeName);
  return theme.colors[variableName];
}