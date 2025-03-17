import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";  
import dynamic from 'next/dynamic';
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
  adjustFontFallback: true,
});

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

export const metadata: Metadata = {
  title: "Hey - I'm Samir",
  description: "Hey I'm Samir. I drive business impact at fintechs.",
  icons: {
    icon: [
      {
        url: "/ventures-brands/samir-favicon.png",
        sizes: "32x32",
        type: "image/png"
      },
      {
        url: "/ventures-brands/samir-favicon.png",
        sizes: "16x16",
        type: "image/png"
      }
    ],
    apple: "/ventures-brands/samir-favicon.png",
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} antialiased bg-background text-foreground min-h-screen`} suppressHydrationWarning>
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
      </body>
    </html>
  );
}