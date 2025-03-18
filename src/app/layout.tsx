import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ErrorBoundary } from "@/components/error-boundary";
import dynamic from 'next/dynamic'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

// Dynamically import components that depend on theme
const Navbar = dynamic(
  () => import('@/components/navbar'),
  {
    ssr: false,
    loading: () => (
      <div className="fixed top-0 left-0 right-0 z-50 h-20 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-6 h-full flex items-center">
          <div className="animate-pulse h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      </div>
    )
  }
)

const Footer = dynamic(
  () => import('@/components/footer'),
  {
    ssr: false,
    loading: () => null
  }
)

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
        <ErrorBoundary name="ThemeProvider">
          <ThemeProvider>
            <div className="min-h-screen flex flex-col">
              <ErrorBoundary name="Navbar">
                <Navbar />
              </ErrorBoundary>

              <main className="flex-grow max-w-4xl mx-auto px-6 w-full py-8 mt-20">
                <ErrorBoundary name="MainContent">
                  {children}
                </ErrorBoundary>
              </main>

              <footer className="mt-auto">
                <ErrorBoundary name="Footer">
                  <Footer />
                </ErrorBoundary>
              </footer>
            </div>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}