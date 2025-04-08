import { Inter, Alexandria } from "next/font/google"

export const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
  preload: true,
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
  adjustFontFallback: false, // Prevent hydration mismatches
})

export const alexandria = Alexandria({
  subsets: ["latin"],
  variable: '--font-alexandria',
  preload: true,
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
  adjustFontFallback: false, // Prevent hydration mismatches
})
