/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true, // Keep unoptimized for Replit deployment
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Configure experimental features
  experimental: {
    // Enable CSS optimization
    optimizeCss: true,
    // Enable proper font optimization
    optimizePackageImports: ['@/components'],
  },
  // Configure proper compression
  compress: true,
  // Configure static file serving
  async headers() {
    return [
      {
        source: '/portfolio-logos/:path*',
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