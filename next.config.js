/** @type {import('next').NextConfig} */
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Version: 3.4.4 - Ultra-enhanced React 19 Compatibility Mode
const nextConfig = {
  // Disable strict mode to prevent double-rendering issues with React 19
  reactStrictMode: false,
  
  // Output as a standalone build
  output: 'standalone',
  
  // Configure server-side components at the top level as per Next.js 15 standards
  serverComponentsExternalPackages: [
    'react', 
    'react-dom', 
    'next/navigation', 
    'next/router'
  ],
  
  // Use classic React runtime to avoid React 19 compatibility issues
  compiler: {
    styledComponents: true,
    // Disable React server components for now
    reactRemoveProperties: true
  },
  
  // Force specific transpilation settings
  transpilePackages: [
    'react',
    'react-dom',
    'next-themes'
  ],
  
  experimental: {
    // Disable React 19 experimental features that might cause issues
    optimizeCss: true,
    serverMinification: false,
    // Force React to use the correct runtime
    serverActions: {
      bodySizeLimit: '2mb',
    },
    // Adjust feature flags for React 19
    optimizePackageImports: ['react', 'react-dom', 'next-themes'],
    // Disable features known to cause issues with React 19
    appDocumentPreloading: false,
    trustHostHeader: true,
    // Override the React runtime version to ensure compatibility
    reactRoot: true,
    forceSwcTransforms: true
  },
  
  // Force module/nomodule to avoid hydration issues
  swcMinify: false,
  
  webpack: (config, { isServer, dev }) => {
    // Enhanced fix for React 19 - ensure consistent React instance and correct JSX runtime
    config.resolve.alias = {
      ...config.resolve.alias,
      'react': path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
      'react/jsx-runtime': path.resolve(__dirname, 'node_modules/react/jsx-runtime'),
      'react/jsx-dev-runtime': path.resolve(__dirname, 'node_modules/react/jsx-runtime'),
      'next-themes': path.resolve(__dirname, 'node_modules/next-themes'),
      'scheduler': path.resolve(__dirname, 'node_modules/scheduler'),
    };
    
    // Force React modules to be properly deduplicated - prevent duplicate React instances
    config.resolve.dedupe = [
      'react', 
      'react-dom', 
      'scheduler', 
      'next-themes', 
      'react-hydration-provider'
    ];
    
    // Set webpack target to modern browsers to simplify bundle
    if (!isServer) {
      config.target = ['web', 'es2020'];
    }
    
    // More aggressive blocking of problematic React development files
    if (!isServer) {
      // Skip all problematic React development files
      config.module.rules.push({
        test: /node_modules[/\\]next[/\\]dist[/\\]compiled[/\\]react.*[/\\]cjs[/\\].*(development).*\.js$/,
        loader: 'null-loader'
      });
      
      // Fix for development mode React hydration issues
      config.module.rules.push({
        test: /react-dom[/\\]cjs[/\\]react-dom-server.*\.development\.js$/,
        use: 'null-loader',
      });
      
      // Block problematic JSX runtimes
      config.module.rules.push({
        test: /[/\\]jsx-dev-runtime\.development\.js$/,
        use: 'null-loader',
      });
      
      // Force using production React even in development
      config.resolve.alias['react-dom$'] = 'react-dom/profiling';
      config.resolve.alias['scheduler/tracing'] = 'scheduler/tracing-profiling';
    }
    
    // Support SVG files
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    
    // Ensure webpack optimization is correctly configured
    if (!isServer) {
      // Fix client-side optimization with more aggressive settings
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 0,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        automaticNameDelimiter: '~',
        enforceSizeThreshold: 50000,
        cacheGroups: {
          default: false,
          vendors: false,
          // Force React modules to be bundled together
          react: {
            name: 'react-bundle',
            test: /[\\/]node_modules[\\/](react|react-dom|scheduler|next-themes|react-hydration-provider)[\\/]/,
            priority: 40,
            chunks: 'all',
            reuseExistingChunk: true,
          },
          // Create commons bundle
          commons: {
            name: 'commons',
            minChunks: 2,
            priority: 20,
            reuseExistingChunk: true,
          },
          lib: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
              return `npm.${packageName.replace('@', '')}`;
            },
            priority: 10,
            reuseExistingChunk: true,
          },
        },
      };
      
      // Additional optimizations
      if (dev) {
        config.optimization.moduleIds = 'named';
      }
    }
    
    // Add forced React 19 compatibility
    if (!isServer) {
      config.module.rules.push({
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, 'src'),
        ],
        use: {
          loader: 'swc-loader',
          options: {
            jsc: {
              transform: {
                react: {
                  runtime: 'automatic',
                  development: false,
                  refresh: false
                }
              }
            }
          }
        }
      });
    }
    
    return config;
  },
  
  // Enhanced image support
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    dangerouslyAllowSVG: true,
    // Improve image loading performance
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    disableStaticImages: false,
    // Force formats for better compatibility
    formats: ['image/webp']
  },
  
  // Serve attached_assets through static directory mapping
  async rewrites() {
    return [
      {
        source: '/attached_assets/:path*',
        destination: '/attached_assets/:path*',
      },
      // Enable local assets in public directory
      {
        source: '/public/:path*',
        destination: '/:path*',
      }
    ];
  },
  
  // Enhanced headers for performance and security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          // Add cache control for static assets
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, must-revalidate',
          }
        ],
      },
      // Add special headers for images
      {
        source: '/(.*).(jpg|jpeg|png|webp|svg)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, immutable',
          }
        ],
      }
    ];
  },
};

export default nextConfig;