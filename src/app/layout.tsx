import type { Metadata } from "next";
import { inter } from "../config/fonts";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import SimpleNavbar from "../components/simple-navbar";

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
          <SimpleNavbar />
          <main className="flex-grow pt-6">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}