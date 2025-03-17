import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";  
import { RootLayout } from "@/components/root-layout";

const inter = Inter({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: "Samir - Finance & Strategy Leader",
  description: "Hey I'm Samir. I drive business impact at fintechs.",
  icons: {
    icon: [
      {
        url: "/images/ventures-brands/samir-favicon.png",
        sizes: "32x32",
        type: "image/png"
      },
      {
        url: "/images/ventures-brands/samir-favicon.png",
        sizes: "16x16",
        type: "image/png"
      }
    ],
    apple: "/images/ventures-brands/samir-favicon.png",
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
        <RootLayout>{children}</RootLayout>
      </body>
    </html>
  );
}