// Experimental configuration - v3.1.0
export const experimentalConfig = {
  optimizeCss: true, // Optimize CSS for production
  serverMinification: true, // Enable server-side minification
  serverActions: {
    bodySizeLimit: '2mb', // Optimize for smaller payloads
  },
  
  // Turbopack optimizations
  turbo: {
    // Updated from loaders to rules per Next.js recommendation
    rules: {
      // Apply specific Turbopack optimizations
      '*.svg': ['@svgr/webpack', 'url-loader'],
    },
  },
  
  // Runtime optimization
  optimizePackageImports: [
    'react', 
    'react-dom', 
    'tailwindcss',
    'lucide-react'
  ],
};