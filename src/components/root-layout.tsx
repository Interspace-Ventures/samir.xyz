"use client"

// Note: Using dynamic import for React to avoid JSX runtime issues
import dynamic from 'next/dynamic'
import { ErrorBoundary } from "./error-boundary"

// Dynamically import components to defer their loading
const Navbar = dynamic(() => import('./navbar'), { ssr: true })
const Footer = dynamic(() => import('./footer'), { ssr: true })

// React 19 compatible layout with enhanced error handling
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <ErrorBoundary name="Navbar">
        <Navbar />
      </ErrorBoundary>
      <div className="flex-grow pt-6">
        {children}
      </div>
      <ErrorBoundary name="Footer">
        <Footer />
      </ErrorBoundary>
    </div>
  )
}