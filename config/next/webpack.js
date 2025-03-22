/**
 * Next.js webpack optimization configuration
 * @version 3.1.0
 */

export const getWebpackConfig = (isServer) => {
  return (config) => {
    // Completely disable source maps for performance
    config.devtool = false;
    
    // Disable all source map related loaders
    config.module.rules.forEach(rule => {
      if (rule.use && Array.isArray(rule.use)) {
        rule.use.forEach(loader => {
          if (loader.options && loader.options.sourceMap) {
            loader.options.sourceMap = false;
          }
        });
      }
    });
    
    // Add performance optimization settings
    config.optimization = {
      ...config.optimization,
      // Improve chunk splitting
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 10,
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'async',
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      },
    };
    
    // Add cache group for styles
    if (!isServer) {
      // Add CSS optimization
      if (config.optimization && config.optimization.splitChunks && config.optimization.splitChunks.cacheGroups) {
        config.optimization.splitChunks.cacheGroups.styles = {
          name: 'styles',
          test: /\.(css|scss|sass)$/,
          chunks: 'all',
          enforce: true,
          priority: 20,
        };
      }
    }
    
    // Fallbacks for client-side bundling
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      process: false,
    };
    
    // Add terser minification options
    if (config.optimization && config.optimization.minimizer) {
      config.optimization.minimizer.forEach(minimizer => {
        if (minimizer.constructor.name === 'TerserPlugin') {
          minimizer.options.terserOptions = {
            ...minimizer.options.terserOptions,
            compress: {
              ...minimizer.options.terserOptions?.compress,
              drop_console: process.env.NODE_ENV === 'production',
              passes: 2,
            },
            mangle: true,
          };
        }
      });
    }
    
    return config;
  };
};