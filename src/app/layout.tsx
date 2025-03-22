import "@/lib/polyfills.ts";  // Import TypeScript polyfills from new consolidated location
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { ErrorBoundary } from "@/components/error-boundary";
import BasicLayout from "@/components/basic-layout"; // Use simpler layout

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Portfolio Site",
  description: "Personal portfolio website showcasing professional achievements",
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

// Using a simpler layout to avoid RSC/webpack issues
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`} suppressHydrationWarning>
        <ErrorBoundary name="MainLayout">
          <BasicLayout>
            {children}
          </BasicLayout>
        </ErrorBoundary>
      </body>
    </html>
  );
}