// @ts-check

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  // Core configuration
  reactStrictMode: false,
  trailingSlash: true,

  // Images configuration
  images: {
    domains: ['*'],
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
  
  // Static files handling 
  // We don't need rewrites anymore as files are directly in public folder
  
  // Development settings
  experimental: {
    scrollRestoration: true,
  },
  
  // Ignore the development origin warnings for simplicity
  onDemandEntries: {
    // Keep pages in memory for longer during development
    maxInactiveAge: 25 * 1000,
    // Number of pages to keep in memory
    pagesBufferLength: 5,
  },
  
  // Allow cross-origin requests from Replit webview
  allowedDevOrigins: ['d2193f08-b592-45ce-b730-8dc2c7ef133c-00-1f1txs3yeigba.janeway.replit.dev', '*'],
  
  // Alternative approach for Replit compatibility
  // Define some additional CORS settings directly in the config
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
    ];
  },
  
  // Disable source maps for better performance
  productionBrowserSourceMaps: false,
};

module.exports = nextConfig;