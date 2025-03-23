import type { Metadata } from "next";
import "./globals.css";
import { inter } from "../config/fonts";
import dynamic from 'next/dynamic';

// Safely import components with React 19 compatibility
const ThemeProvider = dynamic(() => import('../components/theme-provider').then(mod => ({ 
  default: mod.ThemeProvider 
})), { ssr: true });

const RootLayout = dynamic(() => import('../components/root-layout'), { ssr: true });

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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body 
        suppressHydrationWarning 
        className="min-h-screen bg-background text-foreground flex flex-col"
      >
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // React 19 compatibility setup
              window.__REACT_DEVTOOLS_APPEND_COMPONENT_STACK__ = false;
              window.__REACT_DEVTOOLS_BREAK_ON_CONSOLE_ERRORS__ = false;
              window.__REACT_DEVTOOLS_SHOW_INLINE_WARNINGS_AND_ERRORS__ = false;
            `,
          }}
        />
        <ThemeProvider>
          <RootLayout>
            {children}
          </RootLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}