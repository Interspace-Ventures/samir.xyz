import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ErrorBoundary } from "@/components/error-boundary";

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
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b">
              <ErrorBoundary name="Navbar">
                <Navbar />
              </ErrorBoundary>
            </header>
            <main className="flex-grow max-w-4xl mx-auto px-6 w-full py-8 mt-20">
              <ErrorBoundary name="Content">
                {children}
              </ErrorBoundary>
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