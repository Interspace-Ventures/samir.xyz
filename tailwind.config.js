/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './app/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Alexandria', 'sans-serif'],
        alexandria: ['Alexandria', 'sans-serif'],
      },
      colors: {
        purple: {
          primary: '#8c5cf6',
          dark: '#3D365C',
          light: '#c084fc',
        },
        text: {
          primary: '#ffffff',
          secondary: '#c084fc',
          tertiary: '#a1a1aa',
        },
        bg: {
          primary: '#3D365C',
          secondary: '#8c5cf6',
        }
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
};