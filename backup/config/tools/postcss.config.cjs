// PostCSS Configuration - v3.2.0
// Optimized for better CSS performance
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {
      // Use faster CSS processing
      minify: true,
    },
    autoprefixer: {
      // Optimize for modern browsers
      flexbox: 'no-2009',
      grid: true,
    },
  },
}