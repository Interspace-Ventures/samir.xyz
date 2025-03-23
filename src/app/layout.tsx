import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import { inter } from "../config/fonts";
import RootLayout from "../components/root-layout";

export const metadata: Metadata = {
  title: "Samir's Portfolio",
  description: "Personal portfolio website showcasing professional achievements and investments",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.className}>
      <body suppressHydrationWarning className="min-h-screen bg-background text-foreground flex flex-col">
        <ThemeProvider>
          <RootLayout>
            {children}
          </RootLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}