import type { Metadata } from "next";
import { inter } from "../config/fonts";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import SimpleNavbar from "../components/layout/simple-navbar";
import Footer from "../components/layout/footer";
import { ErrorBoundary } from "../components/error-boundary";

export const metadata: Metadata = {
  title: "Hey - I'm Samir",
  description: "I drive business impact at fintechs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="min-h-screen bg-black text-gray-100">
        <ThemeProvider>
          <div className="flex flex-col min-h-screen">
            <SimpleNavbar />
            <main className="flex-grow px-4 sm:px-6 py-8">
              {children}
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