import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";  
import { ThemeProvider } from "@/components/theme-provider";
import { PageTransition } from "@/components/page-transition";
import dynamic from 'next/dynamic';

// Dynamically import non-critical components
const Navbar = dynamic(() => import("@/components/navbar"), {
  loading: () => <div className="h-16" /> // Placeholder while loading
});

const Footer = dynamic(() => import("@/components/Footer"), {
  ssr: true // Enable SSR for footer as it's visible on first load
});

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter', 
  display: 'swap', // Ensure text remains visible during webfont load
  preload: true,  // Preload the font file
});

export const metadata: Metadata = {
  title: "Samir - Finance & Strategy Leader",
  description: "Personal portfolio showcasing professional projects and expertise in fintech",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Add preload hints for critical resources */}
        <link 
          rel="preload" 
          href="/fonts/inter-var.woff2" 
          as="font" 
          type="font/woff2" 
          crossOrigin="anonymous" 
        />
      </head>
      <body 
        className={`${inter.className} ${inter.variable} min-h-screen bg-background antialiased`}
        style={{ isolation: 'isolate' }} // Create new stacking context for better performance
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-8">
              <PageTransition>
                {children}
              </PageTransition>
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}