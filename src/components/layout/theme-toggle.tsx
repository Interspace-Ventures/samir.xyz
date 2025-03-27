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
        className="w-9 h-9 flex items-center justify-center rounded-md transition-colors"
        style={{
          backgroundColor: "transparent",
          border: "none",
          cursor: "pointer",
          padding: "8px",
          borderRadius: "4px"
        }}
      >
        <span className="material-symbols-outlined" style={{ opacity: 0 }}>
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
      style={{
        backgroundColor: "transparent",
        border: "none",
        cursor: "pointer",
        padding: "8px",
        borderRadius: "4px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: isDark ? "#f1f5f9" : "#4b5563",
        transition: "all 0.3s ease",
        textShadow: isDark ? "0 0 10px rgba(76, 29, 149, 0.8), 0 0 15px rgba(59, 7, 100, 0.4)" : "none"
      }}
    >
      <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
        {isDark ? "light_mode" : "dark_mode"}
      </span>
    </button>
  );
}