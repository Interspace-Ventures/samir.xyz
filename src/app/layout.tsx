import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import ClientLayout from "@/components/client-layout";

// Move font configuration outside component to ensure consistent loading
const inter = Inter({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-inter',
  adjustFontFallback: true,
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
      <body className={`${inter.className} antialiased`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}