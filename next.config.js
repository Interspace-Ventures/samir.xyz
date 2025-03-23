/** @type {import('next').NextConfig} */
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  reactStrictMode: false,
  // Disable React strict mode to avoid double renders in development which can cause issues with React 19
  
  experimental: {
    optimizeCss: true,
    // Keeping only recommended experimental features
  },
  
  webpack: (config, { isServer }) => {
    // Enhanced React 19 compatibility
    if (!isServer) {
      // Fix jsx runtime errors by ensuring proper React resolution
      config.resolve.alias = {
        ...config.resolve.alias,
        'react': path.resolve('node_modules/react'),
        'react-dom': path.resolve('node_modules/react-dom'),
        'react/jsx-runtime': path.resolve('node_modules/react/jsx-runtime'),
        'react/jsx-dev-runtime': path.resolve('node_modules/react/jsx-dev-runtime'),
      };
      
      // Prevent multiple React instances
      config.resolve.dedupe = ['react', 'react-dom'];
      
      // Add React 19 shim for better compatibility
      config.module.rules.unshift({
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        include: [
          path.resolve('node_modules/next/dist/compiled/react'),
          path.resolve('node_modules/next/dist/compiled/react-dom'),
        ],
        use: {
          loader: 'null-loader',
        },
      });
    }
    
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
    
    // Fix React 19 specific issues with server components
    config.module.rules.push({
      test: /node_modules[\\/](react-server-dom-webpack|react-dom)[\\/].+\.js$/,
      use: {
        loader: 'null-loader',
      },
    });
    
    // Fix for the specific "Cannot read properties of undefined (reading 'ReactCurrentDispatcher')" error
    config.module.rules.push({
      test: /node_modules\/next\/dist\/compiled\/react\/cjs\/react-jsx-dev-runtime\.development\.js$/,
      use: {
        loader: 'null-loader', // Skip this problematic file and use the ESM version instead
      },
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
  
  // Serve attached_assets through static directory mapping
  async rewrites() {
    return [
      {
        source: '/attached_assets/:path*',
        destination: '/attached_assets/:path*',
      }
    ];
  },
  
  // Add attached_assets directory to the static folders
  serverRuntimeConfig: {
    attachedAssetsDirectory: path.join(process.cwd(), 'attached_assets'),
  },
  
  allowedDevOrigins: [
    'localhost:*',
    '*.replit.dev',
    '*.repl.co',
    '*.janeway.replit.dev'
  ],
};

export default nextConfig;