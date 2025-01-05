import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-gray-100 transition-colors" />
      ) : (
        <Moon className="h-5 w-5 text-gray-800 transition-colors" />
      )}
    </button>
  );
}