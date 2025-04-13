/** @type {import('next').NextConfig} */

// Basic configuration for stability
const nextConfig = {
  // Core configuration
  reactStrictMode: false,
  trailingSlash: true,
  
  // Support for Replit environment
  output: 'standalone',
  
  // Disable unnecessary features
  productionBrowserSourceMaps: false,
  
  // Simple image optimization
  images: {
    unoptimized: true,
  },
  
  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;