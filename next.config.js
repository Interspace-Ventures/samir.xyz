/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  distDir: '.next',
  
  // Simplified configuration for troubleshooting
  experimental: {
    optimizeCss: true,
  },
  
  // Configure image optimization
  images: {
    unoptimized: true,
  },
  
  // Basic headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
    ];
  },
  
  // Disable powered by header
  poweredByHeader: false,
};

export default nextConfig;