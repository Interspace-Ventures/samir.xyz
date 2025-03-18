/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        }
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-in-from-bottom": {
          "0%": { transform: "translateY(20px)" },
          "100%": { transform: "translateY(0)" },
        },
        "card-hover": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-8px)" }
        }
      },
      animation: {
        "fade-in": "fade-in 0.3s ease-in-out",
        "slide-in-from-bottom": "slide-in-from-bottom 0.3s ease-out",
        "card-hover": "card-hover 0.2s ease-out forwards"
      }
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
}