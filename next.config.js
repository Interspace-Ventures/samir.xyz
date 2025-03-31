// @ts-check

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  // Core configuration
  reactStrictMode: true, // Enable React strict mode for better development experience
  trailingSlash: true,
  
  // Images configuration
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
    unoptimized: true,
    dangerouslyAllowSVG: true
  },
  
  // Development settings
  experimental: {
    scrollRestoration: true,
  },
  
  // Memory management for development
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 5,
  },
  
  // Allow cross-origin requests from Replit webview
  allowedDevOrigins: ['*'],
  
  // Support for Replit environment
  crossOrigin: 'anonymous',

  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
        ],
      },
      {
        // Cache optimization for static assets
        source: '/(.*)\\.(jpg|jpeg|png|svg|webp|js|css|woff|woff2)$',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
  
  // Disable source maps for production
  productionBrowserSourceMaps: false,
};

module.exports = nextConfig;