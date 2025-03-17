import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";  
import { ThemeProvider } from "@/components/theme-provider";
import { RootLayout } from "@/components/root-layout";

const inter = Inter({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
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
    <html lang="en" className="antialiased">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <div id="app-root">
            <RootLayout>{children}</RootLayout>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}