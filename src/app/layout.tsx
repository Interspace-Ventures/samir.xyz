import type { Metadata } from "next";

// Version 7.0.0 - Ultra Minimal Layout (Absolute Barebones)

export const metadata: Metadata = {
  title: "Samir's Portfolio - Minimal",
  description: "Personal portfolio website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}