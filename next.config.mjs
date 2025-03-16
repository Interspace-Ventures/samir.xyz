/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true, 
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Enable React strict mode for better performance debugging
  reactStrictMode: true,
  // Enable build-time performance optimization
  swcMinify: true,
  // Configure experimental features
  experimental: {
    // Enable CSS optimization
    optimizeCss: true,
    // Enable proper font optimization
    optimizePackageImports: ['@/components'],
    // Enable better JS optimization
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  // Configure proper compression
  compress: true,
  // Add performance headers
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
  // Optimize page loading
  poweredByHeader: false,
};

export default nextConfig;