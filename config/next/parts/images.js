// Image optimization configuration - v3.1.0
export const imageConfig = {
  // We'll keep unoptimized for now to maintain compatibility
  unoptimized: true,
  domains: ['localhost'],
  remotePatterns: [
    {
      protocol: 'https',
      hostname: '**',
    },
    {
      protocol: 'http',
      hostname: '**',
    },
  ],
  // Minimize image loading impact with optimized size sets
  deviceSizes: [640, 768, 1024, 1280, 1536],
  imageSizes: [16, 32, 48, 64, 96, 128, 256],
};