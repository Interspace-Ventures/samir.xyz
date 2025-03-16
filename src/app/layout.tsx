import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";  
import { ThemeProvider } from "@/components/theme-provider";
import { RootLayout } from "@/components/root-layout";

const inter = Inter({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: "Samir - Finance & Strategy Leader",
  description: "Personal portfolio showcasing professional projects and expertise in fintech",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider>
          <RootLayout>{children}</RootLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}