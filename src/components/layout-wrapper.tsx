"use client"

import * as React from "react"
import dynamic from 'next/dynamic';
import { ThemeProvider } from "@/components/theme-provider";

// Load navbar and footer
const Navbar = dynamic(() => import("@/components/navbar"));
const Footer = dynamic(() => import("@/components/footer"));

function LayoutWrapperInner({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Show loading state during hydration
  if (!mounted) {
    return (
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <div className="h-20 bg-background/80 backdrop-blur-sm border-b fixed top-0 left-0 right-0 z-50" />
        <main className="flex-grow max-w-4xl mx-auto px-6 w-full py-8 mt-20">
          <div className="animate-pulse bg-muted/10 rounded-lg h-[600px] w-full" />
        </main>
        <div className="h-8" />
        <footer className="h-16 bg-background/80 backdrop-blur-sm border-t" />
      </div>
    )
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <div className="fixed top-0 left-0 right-0 z-50">
          <Navbar />
        </div>
        <main className="flex-grow max-w-4xl mx-auto px-6 w-full py-8 mt-20 animate-in fade-in duration-300">
          {children}
        </main>
        <div className="h-8" />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default LayoutWrapperInner;