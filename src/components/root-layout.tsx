"use client"

import * as React from "react"
import dynamic from 'next/dynamic'
import { ErrorBoundary } from './error-boundary'

const Navbar = dynamic(() => import("@/components/navbar"), {
  ssr: false,
})

const Footer = dynamic(() => import("@/components/footer"), {
  ssr: false,
})

export function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <ErrorBoundary name="RootLayout">
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <div className="fixed top-0 left-0 right-0 z-50">
          {mounted && <Navbar />}
        </div>
        <main className="flex-grow max-w-4xl mx-auto px-6 w-full py-8 mt-20">
          {children}
        </main>
        {mounted && <Footer />}
      </div>
    </ErrorBoundary>
  )
}