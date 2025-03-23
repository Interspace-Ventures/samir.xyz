import type { Metadata, Viewport } from "next";
import "./globals.css";

// Version 8.3.0 - Server-Side Only Layout with Fixed Viewport

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Samir's Portfolio",
  description: "Personal portfolio website showcasing fintech expertise and ventures",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
      </head>
      <body style={{ 
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        lineHeight: "1.5",
        color: "#333",
        backgroundColor: "#f5f7fa",
        margin: 0,
        padding: 0
      }}>
        <div style={{ 
          maxWidth: "1200px", 
          margin: "0 auto", 
          padding: "2rem 1rem"
        }}>
          {children}
        </div>
      </body>
    </html>
  );
}