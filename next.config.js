/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    optimizeCss: true,
  },
  webpack: (config) => {
    // Improve SVG handling with both next/image support and React component import
    config.module.rules.push({
      test: /\.svg$/,
      oneOf: [
        // First, check if it's imported as React component (import Logo from './logo.svg')
        {
          resourceQuery: /react/, // If the import has ?react in it
          use: [{
            loader: '@svgr/webpack',
            options: {
              svgoConfig: {
                plugins: [
                  {
                    name: 'preset-default',
                    params: {
                      overrides: {
                        removeViewBox: false,
                      },
                    },
                  },
                ],
              },
            },
          }],
        },
        // Otherwise, let it be handled as a regular asset (for next/image)
        {
          type: 'asset/resource',
          generator: {
            filename: 'static/media/[name].[hash][ext]',
          },
        }
      ],
    });
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  allowedDevOrigins: [
    'localhost:*',
    '*.replit.dev',
    '*.repl.co',
    '*.janeway.replit.dev'
  ],
};

module.exports = nextConfig;