// @ts-check

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  // Disable React strict mode temporarily to avoid double-rendering issues
  reactStrictMode: false,
  
  // Configure image domains and optimization
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
    unoptimized: true, // Disable image optimization to avoid webpack issues
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Additional webpack configuration to address client-side rendering issues
  webpack: (config, { isServer, dev }) => {
    // Disable source maps in client production builds
    if (!isServer && !dev) {
      config.devtool = false;
    }
    
    // Fix for webpack module loading issues
    if (!isServer) {
      // Ensure proper module resolution for client components
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        module: false,
        path: false,
        os: false,
      };
      
      // Ignore server-only packages 
      config.externals.push({
        'react-dom/server': 'commonjs react-dom/server',
      });
      
      // Prevent source map errors
      if (config.optimization) {
        if (config.optimization.minimizer) {
          for (const plugin of config.optimization.minimizer) {
            if (plugin.constructor.name === 'TerserPlugin') {
              plugin.options.sourceMap = false;
            }
          }
        }
      }
    }
    
    return config;
  },
  
  // Improved experimental features
  experimental: {
    // Enable scroll restoration
    scrollRestoration: true,
    
    // Specify allowed origin patterns exactly as they appear in the warning message
    allowedDevOrigins: [
      // Include the exact domain from the warning message
      'd2193f08-b592-45ce-b730-8dc2c7ef133c-00-1f1txs3yeigba.janeway.replit.dev',
      // Add common Replit patterns
      '.janeway.replit.dev',
      '.replit.dev',
      '.repl.co',
      '.replit.app',
      'replit.com',
      // Add local patterns
      'localhost',
      '127.0.0.1',
      // Add wildcard - this covers all domains for testing purposes
      '*',
      // Special wildcard format to ensure all domains work
      '**.replit.dev',
    ],
    
    // Opt into more stable React features
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  
  // Server external packages (moved from experimental in Next.js 15)
  serverExternalPackages: [],
  
  // Enable CORS for development purposes
  async headers() {
    return [
      {
        // Apply these headers to all routes
        source: '/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
        ],
      },
    ];
  },
  
  // Suppress hydration warnings in dev mode
  onDemandEntries: {
    // Keep generated pages in memory for longer
    maxInactiveAge: 60 * 60 * 1000,
    // Set a higher number of concurrent pages
    pagesBufferLength: 5,
  },
  
  // Disable source maps in production to fix webpack issues
  productionBrowserSourceMaps: false,
  
  // Add additional security headers
  poweredByHeader: false,
};

module.exports = nextConfig;