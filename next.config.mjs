/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['*.app', '*.com', '*.co'],
    unoptimized: true
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