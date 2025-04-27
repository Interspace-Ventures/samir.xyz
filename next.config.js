/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The App Router is now stable and no longer requires the experimental flag
  // swcMinify is now the default in Next.js 13+
  
  // Note: Server configuration should be set when starting the Next.js server
  // not in the config file. These settings have been moved to run.sh or
  // can be set with environment variables
  
  // Configure image optimization to properly handle local images
  images: {
    domains: ['localhost', '0.0.0.0'],
    unoptimized: true, // Disable image optimization to resolve issues with local images
  }
};

module.exports = nextConfig;