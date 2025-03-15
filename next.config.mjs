/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: false,
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
};

export default nextConfig;