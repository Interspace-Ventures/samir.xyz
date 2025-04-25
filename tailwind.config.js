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
        'purple-primary': '#8c5cf6',
        'purple-dark': '#3D365C',
        'purple-light': '#c084fc',
        'text-primary': '#ffffff',
        'text-secondary': '#c084fc',
        'text-tertiary': '#a1a1aa',
        'bg-primary': '#3D365C',
        'bg-secondary': '#8c5cf6',
      },
      backgroundColor: {
        'primary': '#3D365C',
        'secondary': '#8c5cf6',
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