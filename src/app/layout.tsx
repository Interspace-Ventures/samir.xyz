import type { Metadata } from "next";
import { inter } from "../config/fonts";
import "./globals.css";
import Navbar from "../components/navbar";

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
    <html lang="en" className={inter.className}>
      <body>
        <Navbar />
        <main className="max-w-6xl mx-auto py-8 px-4 min-h-[calc(100vh-160px)]">
          {children}
        </main>
        <footer className="bg-gray-900 border-t border-gray-800 p-6 text-center text-gray-400">
          <div className="max-w-6xl mx-auto">
            <p>© {new Date().getFullYear()} Samir • Built with Next.js</p>
            <div className="flex justify-center gap-4 mt-3">
              <a href="https://twitter.com/heyinterspace" className="text-gray-400 hover:text-purple-400 transition-colors">Twitter</a>
              <a href="https://linkedin.com" className="text-gray-400 hover:text-purple-400 transition-colors">LinkedIn</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}