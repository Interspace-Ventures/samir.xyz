// PostCSS Configuration for Remix
module.exports = {
  plugins: {
    'tailwindcss': {},
    'autoprefixer': {
      // Optimize for modern browsers
      flexbox: 'no-2009',
      grid: true,
    },
  },
}