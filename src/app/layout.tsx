import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { ErrorBoundary } from "@/components/error-boundary";
import dynamic from 'next/dynamic';

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

// Dynamically import the client components wrapper
const ClientWrapper = dynamic(
  () => import('@/components/client-wrapper'),
  {
    loading: () => (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="animate-pulse space-y-4 p-6">
          <div className="h-8 w-1/3 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      </div>
    )
  }
);

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
      <body className={`${inter.variable} font-sans antialiased bg-background`}>
        <ErrorBoundary name="MainLayout">
          <ClientWrapper>
            {children}
          </ClientWrapper>
        </ErrorBoundary>
      </body>
    </html>
  );
}