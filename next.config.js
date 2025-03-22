/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  distDir: '.next',
  
  // Configure image optimization and domains
  images: {
    unoptimized: true,
    domains: ['*'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  
  // Completely disable edge runtime and middleware
  experimental: {
    runtime: 'nodejs',
    disableEdgeRuntime: true,
    serverComponents: true,
    serverActions: false,
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
  
  // Configure webpack for Bun compatibility
  webpack: (config) => {
    // Exclude edge runtime and related polyfills
    config.resolve = {
      ...config.resolve,
      fallback: {
        ...config.resolve?.fallback,
        stream: false,
        crypto: false,
        '@edge-runtime/primitives': false,
        'edge-runtime': false,
      },
    };

    // Better watch options for development
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };

    return config;
  },
  
  // Disable powered by header
  poweredByHeader: false,
};

export default nextConfig;