/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Avoid double renders
  output: 'standalone',
  distDir: '.next',
  
  // Enable only valid experimental features
  experimental: {
    optimizeCss: true,
  },
  
  // External packages configuration
  serverExternalPackages: [],
  
  // Keep this enabled for routing
  useFileSystemPublicRoutes: true,
  
  // Configure image optimization
  images: {
    unoptimized: true, // Disable image optimization for simplicity
  },
  
  // Ensure proper handling of paths in Replit environment
  assetPrefix: process.env.NODE_ENV === 'production' ? undefined : '',
  basePath: '',
  
  // Disable middleware which often uses edge runtime
  skipMiddlewareUrlNormalize: true,
  skipTrailingSlashRedirect: true,
  
  // Set up security headers without middleware
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
    ];
  },
  
  // Configure webpack to make the app work with Bun and disable RSC
  webpack: (config, { isServer }) => {
    // Exclude RSC and edge runtime related modules
    config.resolve = {
      ...config.resolve,
      fallback: {
        ...config.resolve?.fallback,
        stream: false,
        crypto: false,
        '@edge-runtime/primitives': false,
        'edge-runtime': false,
        'react-server-dom-webpack': false,
        'next/dist/compiled/react-server-dom-webpack/client': false,
        'next/dist/compiled/react-server-dom-webpack/server.node': false,
        'next/dist/compiled/react-server-dom-webpack/client.browser': false,
        'next/dist/compiled/react-server-dom-webpack/client.edge': false,
        'next/dist/compiled/react-server-dom-webpack': false,
      },
    };

    // Add alias for React to ensure consistent version
    config.resolve.alias = {
      ...config.resolve.alias,
      'react': 'react',
      'react-dom': 'react-dom',
    };

    // Better watch options for development
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };

    // Explicitly ignore RSC modules
    config.module = config.module || {};
    config.module.rules = config.module.rules || [];
    
    // Ignore all RSC-related modules with null-loader
    config.module.rules.push({
      test: /react-server-dom-webpack|server-components/,
      use: 'null-loader',
    });

    return config;
  },
  
  // Disable powered by header
  poweredByHeader: false,
};

export default nextConfig;