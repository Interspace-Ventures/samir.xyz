"use client"

import * as React from "react"
import { ThemeProvider } from "@/components/theme-provider";
import { PageTransition } from "@/components/page-transition";
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

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

export function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

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
    );
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <div className="fixed top-0 left-0 right-0 z-50">
          <Navbar />
        </div>
        <main className="flex-grow max-w-4xl mx-auto px-6 w-full py-8 mt-20">
          <Suspense 
            fallback={
              <div className="animate-pulse bg-muted/10 rounded-lg h-[600px] w-full" />
            }
          >
            <PageTransition>
              {children}
            </PageTransition>
          </Suspense>
        </main>
        <div className="h-8" />
        <Footer />
      </div>
    </ThemeProvider>
  );
}