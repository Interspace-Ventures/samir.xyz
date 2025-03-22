import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { ErrorBoundary } from "../components/error-boundary";
import { ThemeProvider } from "../components/theme-provider";
import { inter } from "../config/fonts";

export const metadata: Metadata = {
  title: "Samir's Portfolio",
  description: "Personal portfolio website showcasing professional achievements and investments",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.className}>
      <body suppressHydrationWarning className="min-h-screen bg-background text-foreground flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="dark">
          <ErrorBoundary name="Navbar">
            <Navbar />
          </ErrorBoundary>
          <div className="flex-grow pt-20">
            {children}
          </div>
          <ErrorBoundary name="Footer">
            <Footer />
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}