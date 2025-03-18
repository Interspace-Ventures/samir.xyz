/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  distDir: '.next',
  // Configure image optimization and domains
  images: {
    unoptimized: true,
    domains: ['*'], //Preserving the original functionality
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
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
  // Configure webpack for development
  webpack: (config, { dev, isServer }) => {
    // Let Next.js handle the devtool configuration
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