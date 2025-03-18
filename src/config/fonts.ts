import { Inter } from "next/font/google"

export const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
  preload: true,
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
  adjustFontFallback: false, // Prevent hydration mismatches
})
