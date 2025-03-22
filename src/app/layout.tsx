import "@/polyfills";  // Import polyfills first
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { ErrorBoundary } from "@/components/error-boundary";
import ClientWrapper from "@/components/client-wrapper";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
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
      <body className={`${inter.variable} font-sans antialiased`} suppressHydrationWarning>
        <ErrorBoundary name="MainLayout">
          <ClientWrapper>
            {children}
          </ClientWrapper>
        </ErrorBoundary>
      </body>
    </html>
  );
}