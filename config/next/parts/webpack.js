// Webpack optimization configuration - v3.1.0
export function webpackConfig(config, { isServer }) {
  // Disable source maps for performance
  config.devtool = false;
  
  // Optimize module resolution
  config.resolve.symlinks = false;
  
  // Optimize rule processing
  config.module.rules.forEach(rule => {
    if (rule.use && Array.isArray(rule.use)) {
      rule.use.forEach(loader => {
        if (loader.options && loader.options.sourceMap) {
          loader.options.sourceMap = false;
        }
      });
    }
  });
  
  // Client-side optimizations
  if (!isServer) {
    // Optimize chunk loading
    config.optimization = {
      ...config.optimization,
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              // Get the package name
              const packageName = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
              )[1];
              
              // Return a unique name to avoid conflicts
              return `npm.${packageName.replace('@', '')}`;
            },
          },
        },
      },
    };
  }
  
  // Fallbacks for client-side bundling - streamlined
  config.resolve.fallback = {
    ...config.resolve.fallback,
    fs: false,
    path: false,
    process: false,
  };
  
  return config;
}