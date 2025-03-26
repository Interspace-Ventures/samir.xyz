import type { Metadata, Viewport } from "next";
import { inter } from "../config/fonts";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import MinimalNavbar from "../components/layout/minimal-navbar";
import Footer from "../components/layout/footer";
import { ErrorBoundary } from "../components/error-boundary";

export const metadata: Metadata = {
  title: "Hey - I'm Samir",
  description: "I drive business impact at fintechs",
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="flex flex-col min-h-screen">
            <MinimalNavbar />
            <main className="flex-grow px-4 sm:px-6 py-10 mt-2"> {/* Increased top padding to prevent navbar overlap */}
              <div className="max-w-screen-xl mx-auto w-full">
                {children}
              </div>
            </main>
            <ErrorBoundary name="Footer">
              <Footer />
            </ErrorBoundary>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}