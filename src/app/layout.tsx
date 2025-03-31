import { inter } from "../config/fonts";
import "./globals.css";
import { metadata, viewport } from "./metadata";
import ClientLayout from "../components/layout/client-layout";

/**
 * Root layout that supports both server-side metadata and client interactivity
 * 
 * This component stays as a server component to support next/metadata exports
 * but delegates interactive rendering to the ClientLayout component
 */
export { metadata, viewport };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=dark_mode,menu,light_mode" />
      </head>
      <body className="antialiased">
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}