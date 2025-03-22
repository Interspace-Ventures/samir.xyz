/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  distDir: '.next',
  
  // Configurations for Turbopack - v3.0.0
  // Critical fix for client-side hydration issues in Replit environment
  experimental: {
    optimizeCss: true,
    // Carefully configured Turbopack settings to prevent hydration errors
    turbo: {
      // Minimal configuration to ensure compatibility with Bun runtime
      rules: {
        // Empty rules to avoid webpack-specific conflicts
      }
    }
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
  
  // Fix cross-origin issues in Replit
  crossOrigin: 'anonymous',
  assetPrefix: process.env.NODE_ENV === 'production' ? undefined : '',
  
  // Allow all origins for development
  allowedDevOrigins: [
    'localhost:*',
    '*.replit.dev',
    '*.repl.co', 
    '*.janeway.replit.dev'
  ],
  
  // CORS headers for development
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
  
  // Additional optimizations - v3.0.0
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  
  // Simplified webpack configuration to avoid conflicts with Turbopack
  webpack: (config, { isServer }) => {
    // Completely disable source maps
    config.devtool = false;
    
    // Disable all source map related loaders
    config.module.rules.forEach(rule => {
      if (rule.use && Array.isArray(rule.use)) {
        rule.use.forEach(loader => {
          if (loader.options && loader.options.sourceMap) {
            loader.options.sourceMap = false;
          }
        });
      }
    });
    
    // Fallbacks for client-side bundling
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