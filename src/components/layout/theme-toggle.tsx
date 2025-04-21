"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Prevent hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return (
      <button 
        aria-label="Toggle theme" 
        className="w-9 h-9 flex items-center justify-center rounded-md bg-transparent border-none cursor-pointer p-2 opacity-0"
      >
        <span className="material-symbols-outlined">
          dark_mode
        </span>
      </button>
    );
  }
  
  const isDark = theme === "dark";
  
  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className={`
        w-9 h-9 flex items-center justify-center rounded-md 
        bg-transparent border-none cursor-pointer p-2
        transition-all duration-300 ease-in-out
        ${isDark ? 'text-slate-100 dark-theme-glow' : 'text-gray-600'}
      `}
    >
      <span className="material-symbols-outlined text-xl">
        {isDark ? "light_mode" : "dark_mode"}
      </span>
    </button>
  );
}