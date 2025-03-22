import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { ErrorBoundary } from "../components/error-boundary";

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
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className="min-h-screen bg-background flex flex-col">
        <ErrorBoundary name="Navbar">
          <Navbar />
        </ErrorBoundary>
        <div className="flex-grow pt-20">
          {children}
        </div>
        <ErrorBoundary name="Footer">
          <Footer />
        </ErrorBoundary>
      </body>
    </html>
  );
}