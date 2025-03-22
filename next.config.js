/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  // Workarounds for Replit environment
  serverExternalPackages: [], // Updated from experimental.serverComponentsExternalPackages
  webpack: (config, { isServer }) => {
    // Handle polyfills for browser APIs
    if (isServer) {
      console.log('Applying server-side webpack configurations');
    }
    return config;
  },
};

export default nextConfig;