/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.app',
      },
      {
        protocol: 'https',
        hostname: '*.com',
      },
      {
        protocol: 'https',
        hostname: '*.co',
      }
    ]
  },
  experimental: {
    serverComponentsExternalPackages: []
  },
  // Ensure development server runs on port 5000
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: '/:path*',
      },
    ]
  }
};

export default nextConfig;