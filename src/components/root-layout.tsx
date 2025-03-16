"use client"

import * as React from "react"
import { ThemeProvider } from "@/components/theme-provider";
import { PageTransition } from "@/components/page-transition";
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const Navbar = dynamic(() => import("@/components/navbar"), {
  loading: () => <div className="h-16 bg-background/80 backdrop-blur-sm border-b fixed top-0 left-0 right-0 z-50" />,
  ssr: true,
});

const Footer = dynamic(() => import("@/components/footer"), {
  ssr: true,
  loading: () => <footer className="h-16 bg-background/80 backdrop-blur-sm border-t" />
});

export function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Suspense fallback={<div className="h-16 bg-background/80 backdrop-blur-sm border-b fixed top-0 left-0 right-0 z-50" />}>
          <div className="sticky top-0 z-50">
            <Navbar />
          </div>
        </Suspense>
        <main className="flex-grow max-w-4xl mx-auto px-6 w-full py-8 mt-16">
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
        <Suspense fallback={<footer className="h-16 bg-background/80 backdrop-blur-sm border-t" />}>
          <Footer />
        </Suspense>
      </div>
    </ThemeProvider>
  );
}