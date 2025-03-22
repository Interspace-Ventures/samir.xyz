import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";

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

// Using a simpler layout without polyfills or client components to avoid hydration issues
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
        <div className="min-h-screen bg-white dark:bg-gray-900">
          <header className="p-4 bg-gray-100 dark:bg-gray-800">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-2xl font-bold">Portfolio Site</h1>
              <nav className="mt-2">
                <ul className="flex space-x-4">
                  <li><a href="/" className="text-blue-600 dark:text-blue-400 hover:underline">Home</a></li>
                  <li><a href="/portfolio" className="text-blue-600 dark:text-blue-400 hover:underline">Portfolio</a></li>
                  <li><a href="/ventures" className="text-blue-600 dark:text-blue-400 hover:underline">Ventures</a></li>
                  <li><a href="/debug" className="text-blue-600 dark:text-blue-400 hover:underline">Debug</a></li>
                </ul>
              </nav>
            </div>
          </header>

          <main className="flex-grow max-w-4xl mx-auto px-6 w-full py-8">
            {children}
          </main>

          <footer className="mt-auto p-4 bg-gray-100 dark:bg-gray-800 text-center">
            <div className="max-w-4xl mx-auto">
              <p className="text-sm text-gray-600 dark:text-gray-400">© {new Date().getFullYear()} Portfolio Site</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}