/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
    domains: ['**'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // The appDir flag is no longer needed in Next.js 13+
  // as the App Router is stable and enabled by default
};

export default nextConfig;