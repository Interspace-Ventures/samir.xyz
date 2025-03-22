/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  distDir: '.next',
  
  // Simplified configuration for troubleshooting
  experimental: {
    optimizeCss: true,
  },
  
  // Configure image optimization
  images: {
    unoptimized: true,
    domains: ['localhost'],
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
  },
  
  // Improved origins configuration to fix cross-origin issues in Replit
  crossOrigin: 'anonymous',
  assetPrefix: process.env.NODE_ENV === 'production' ? undefined : '',
  
  // Allow all origins for development with proper formatting
  allowedDevOrigins: [
    'localhost:*',
    '*.replit.dev',
    '*.repl.co', 
    '*.janeway.replit.dev'
  ],
  
  // Basic headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ];
  },
  
  // Disable source maps to prevent warnings
  productionBrowserSourceMaps: false,
  
  // Disable powered by header
  poweredByHeader: false,
  
  // Enhanced webpack configuration for better client-side handling
  webpack: (config, { isServer }) => {
    // Disable source maps
    config.devtool = false;
    
    // Explicitly handle webpack 5 features
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      process: false,
    };
    
    return config;
  },
  
  // Fix SWC errors
  transpilePackages: ['next'],
};

export default nextConfig;