"use client"

import dynamic from 'next/dynamic';
import { ThemeProvider } from "@/components/theme-provider";

// Load navbar with no SSR to avoid hydration mismatches
const Navbar = dynamic(() => import("@/components/navbar"), {
  loading: () => <div className="h-20 bg-background/80 backdrop-blur-sm border-b fixed top-0 left-0 right-0 z-50" />,
  ssr: false,
});

// Load footer with no SSR to avoid hydration mismatches with date
const Footer = dynamic(() => import("@/components/footer"), {
  ssr: false, 
  loading: () => <footer className="h-16 bg-background/80 backdrop-blur-sm border-t" />
});

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
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
