/** @type {import('next').NextConfig} */

// Version: 10.2.0 - Config for hybrid static/dynamic rendering
const nextConfig = {
  // Enable React strict mode for better error catching
  reactStrictMode: true,
  
  // Configure image domains and optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Allow proper hydration of client components
  experimental: {
    // Suppress specific Next.js errors that might occur during development
    scrollRestoration: true,
  }
};

module.exports = nextConfig;