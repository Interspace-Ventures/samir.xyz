/** @type {import('next').NextConfig} */

// Most basic Next.js configuration for maximum stability
const nextConfig = {
  // Disable strict mode to prevent double rendering in development
  reactStrictMode: false,
  
  // Keep server-side functionality intact for this project
  output: 'standalone',
  
  // Disable source maps to avoid errors
  productionBrowserSourceMaps: false,
  
  // Simplify image handling
  images: {
    unoptimized: true,
  },
  
  // Allow Replit domain for cross-origin in development
  experimental: {
    allowedDevOrigins: ['.replit.dev', '.repl.co']
  },
  
  // Add security headers for cross-origin
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' }
        ],
      },
    ];
  }
};

module.exports = nextConfig;