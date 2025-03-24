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
  
  // Allow proper hydration of client components and cross-origin requests
  experimental: {
    // Suppress specific Next.js errors that might occur during development
    scrollRestoration: true,
    // Allow cross-origin requests in development
    allowedDevOrigins: ['*.replit.dev']
  }
};

module.exports = nextConfig;