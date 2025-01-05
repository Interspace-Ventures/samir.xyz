import type { Config } from "tailwindcss";

export default {
  content: [
    "./client/src/**/*.{js,jsx,ts,tsx}",
    "./client/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        border: "#e2e8f0",
        background: "#ffffff",
        foreground: "#000000",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;