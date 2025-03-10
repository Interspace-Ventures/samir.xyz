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
  }
};

export default nextConfig;