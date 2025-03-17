"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  console.log(`[ThemeProvider] Initializing at ${new Date().toISOString()}`);

  React.useEffect(() => {
    console.log(`[ThemeProvider] Mounted at ${new Date().toISOString()}`);
    return () => console.log(`[ThemeProvider] Unmounting at ${new Date().toISOString()}`);
  }, []);

  try {
    return (
      <NextThemesProvider 
        attribute="class" 
        defaultTheme="dark"
        enableSystem
        storageKey="theme"
        forcedTheme={undefined}
        disableTransitionOnChange
      >
        <div suppressHydrationWarning>
          {children}
        </div>
      </NextThemesProvider>
    )
  } catch (error) {
    console.error('[ThemeProvider] Error rendering theme provider:', error);
    throw error; // Re-throw to trigger error boundary
  }
}