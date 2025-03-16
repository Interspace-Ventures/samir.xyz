import type { Metadata } from "next";
import "@/app/globals.css";  
import { RootLayout } from "@/components/root-layout";

export const metadata: Metadata = {
  title: "Samir - Finance & Strategy Leader",
  description: "Personal portfolio showcasing professional projects and expertise in fintech",
  icons: {
    icon: '/favicon.ico',
  },
};

let pageLoadStart = 0;
if (typeof window !== 'undefined') {
  pageLoadStart = performance.now();
}

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (typeof window !== 'undefined') {
    const loadTime = performance.now() - pageLoadStart;
    console.log(`[Performance] Total page load time: ${loadTime.toFixed(2)}ms`);
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <RootLayout>{children}</RootLayout>
      </body>
    </html>
  );
}