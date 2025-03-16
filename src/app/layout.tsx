import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";  
import { ThemeProvider } from "@/components/theme-provider";
import { PageTransition } from "@/components/page-transition";
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const Navbar = dynamic(() => import("@/components/navbar"), {
  loading: () => <div className="h-16" />,
  ssr: true,
});

const Footer = dynamic(() => import("@/components/footer"), {
  ssr: true,
  loading: () => <footer className="h-16 bg-background" />
});

const inter = Inter({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: "Samir - Finance & Strategy Leader",
  description: "Personal portfolio showcasing professional projects and expertise in fintech",
  icons: {
    icon: '/favicon.ico',
  },
};

let pageLoadStart = 0;
if (typeof window !== 'undefined') {
  pageLoadStart = performance.now();
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (typeof window !== 'undefined') {
    const loadTime = performance.now() - pageLoadStart;
    console.log(`[Performance] Total page load time: ${loadTime.toFixed(2)}ms`);
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} min-h-screen bg-background text-foreground antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col">
            <Suspense fallback={<div className="h-16" />}>
              <Navbar />
            </Suspense>
            <main className="flex-grow max-w-4xl mx-auto px-6 w-full py-8">
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
            <div className="h-8" /> {/* Reduced space before footer */}
            <Suspense fallback={<footer className="h-16 bg-background" />}>
              <Footer />
            </Suspense>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}