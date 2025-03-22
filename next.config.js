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
  // Disable edge runtime to avoid Bun compatibility issues
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
    // Completely disable edge runtime
    runtime: 'nodejs',
    disableEdgeRuntime: true,
  },
  // Cache control headers for static assets
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
    // Add Bun-specific optimizations
    config.resolve = {
      ...config.resolve,
      fallback: {
        ...config.resolve?.fallback,
        stream: false,
        crypto: false,
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