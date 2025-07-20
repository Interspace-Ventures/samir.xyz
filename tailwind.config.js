/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    'bg-purple-primary',
    'text-purple-primary',
    'border-purple-primary',
    'animate-shimmer',
    'animate-pulse',
    'bg-white/5',
    'bg-white/10',
    'text-white',
    'bg-[#2d0c6a]',
    'bg-[#381490]',
    'border-[#7f55dc]'
  ],
  theme: {
    extend: {
      fontFamily: {
        'alexandria': ['Alexandria', 'sans-serif'],
        'sans': ['Alexandria', 'system-ui', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        'purple-primary': '#7f55dc',
        'purple': {
          '100': '#eae3fa',
          '200': '#d5c7f6',
          '300': '#c0abf1',
          '400': '#ab8fed',
          '500': '#9673e8',
          '600': '#7f55dc',
          '700': '#6339c7',
          '800': '#4a20a9',
          '900': '#2d0c6a',
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
        'shimmer': 'shimmer 2s infinite',
        'pulse': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
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
        'shimmer': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
      borderWidth: {
        DEFAULT: '1px',
      },
      borderColor: {
        'purple-primary': '#7f55dc',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}