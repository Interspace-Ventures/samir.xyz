import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import ClientLayout from "@/components/client-layout";

// Configure font outside component for better caching and hydration
const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  preload: true,
  display: 'swap',
  adjustFontFallback: false, // Disable font fallback adjustment to prevent hydration mismatches
  weight: ['400', '500', '600', '700', '800', '900'], // Add back required weights
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

export default function RootLayout({
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
      <body className={`${inter.variable} font-sans antialiased bg-background`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}