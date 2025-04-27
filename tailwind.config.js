/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'alexandria': ['Alexandria', 'sans-serif'],
        'sans': ['Alexandria', 'system-ui', 'sans-serif'],
      },
      colors: {
        /* Main brand color */
        'primary': '#7f55dc',
        
        /* Text colors */
        'text-primary': '#ffffff',
        'text-secondary': '#c084fc',
        'text-tertiary': '#a1a1aa',
        
        /* Background colors */
        'bg-primary': '#3D365C',
        
        /* Legacy colors maintained for compatibility */
        'purple-primary': '#7f55dc', // Same as primary
      },
      backgroundColor: {
        'primary': '#7f55dc',
        'secondary': '#c084fc',
      },
      textColor: {
        'primary': '#ffffff',
        'secondary': '#c084fc',
        'tertiary': '#a1a1aa',
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-in-out',
        'slide-up': 'slide-up 0.5s ease-out',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}