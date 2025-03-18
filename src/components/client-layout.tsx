"use client"

import * as React from "react"
import dynamic from "next/dynamic"

// Dynamically import components
const Navbar = dynamic(() => import("@/components/navbar"), {
  ssr: false,
  loading: () => <div className="h-20 bg-white border-b" />
})

const Footer = dynamic(() => import("@/components/footer"), {
  ssr: false,
  loading: () => <div className="h-16 bg-white border-t" />
})

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </header>
      <main className="flex-grow max-w-4xl mx-auto px-6 w-full py-8 mt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
}