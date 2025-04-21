import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Hey - I'm Samir",
  description: "I drive business impact at fintechs",
  // Ensure better WebView compatibility with custom meta tags
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000'),
  // Using applicationName and appleWebApp for better WebView support
  applicationName: "Samir's Portfolio",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent" as "black-translucent",
    title: "Samir's Portfolio",
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#2a3bff' }, // Updated to match logo gradient
  ],
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  viewportFit: 'cover', // Helps with notches and rounded corners on mobile devices
  interactiveWidget: 'resizes-visual', // Better interaction in WebViews
};