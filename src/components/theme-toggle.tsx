"use client"

import * as React from "react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const [mounted, setMounted] = React.useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  React.useEffect(() => {
    try {
      console.log(`[ThemeToggle] Mounting at ${new Date().toISOString()}`);
      console.log('[ThemeToggle] Initial theme state:', { 
        resolvedTheme, 
        mounted,
        phase: 'mount',
        hookType: 'useTheme initialization'
      });
      setMounted(true)
      return () => console.log(`[ThemeToggle] Unmounting at ${new Date().toISOString()}`);
    } catch (error) {
      console.error('[ThemeToggle] Error in mount effect:', error);
    }
  }, [resolvedTheme])

  // During SSR and initial client render, show a placeholder
  if (!mounted) {
    console.log('[ThemeToggle] Rendering loading state (not mounted)');
    return (
      <button 
        className="px-4 py-2 rounded bg-primary text-primary-foreground"
        aria-label="Loading theme toggle"
        disabled
      >
        Loading...
      </button>
    )
  }

  console.log('[ThemeToggle] Rendering mounted state:', { resolvedTheme });

  return (
    <button
      onClick={() => {
        try {
          const newTheme = resolvedTheme === "dark" ? "light" : "dark";
          console.log(`[ThemeToggle] Changing theme from ${resolvedTheme} to ${newTheme}`);
          setTheme(newTheme);
        } catch (error) {
          console.error('[ThemeToggle] Error changing theme:', error);
        }
      }}
      className="px-4 py-2 rounded bg-primary text-primary-foreground"
      aria-label="Toggle theme"
    >
      {resolvedTheme === "dark" ? "Light" : "Dark"}
    </button>
  )
}