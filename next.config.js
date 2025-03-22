/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Avoid double renders
  output: 'standalone',
  distDir: '.next',
  
  // Minimal experimental config with only supported features
  experimental: {
    optimizeCss: true,
  },
  
  // External packages configuration (moved from experimental)
  serverExternalPackages: [],
  
  // Keep this enabled for routing
  useFileSystemPublicRoutes: true,
  
  // Configure image optimization and domains
  images: {
    unoptimized: true,
    formats: ['image/webp'],
    domains: ['*'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  
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
        ],
      },
    ];
  },
  
  // Configure webpack for Bun compatibility and to fully disable RSC
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

    // Add rule to ignore RSC imports
    config.module = config.module || {};
    config.module.rules = config.module.rules || [];
    
    // Add a rule to handle RSC imports
    config.module.rules.push({
      test: /react-server-dom-webpack/,
      use: 'null-loader',
    });

    return config;
  },
  
  // Disable powered by header
  poweredByHeader: false,
};

export default nextConfig;