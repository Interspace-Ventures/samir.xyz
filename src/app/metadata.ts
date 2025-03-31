import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Hey - I'm Samir",
  description: "I drive business impact at fintechs",
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#2c104a' }, // Updated to dark purple
  ],
  width: 'device-width',
  initialScale: 1,
};