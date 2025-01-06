import React from "react";
import { Link } from "wouter";
import { type ReactNode } from "react";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <nav className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-xl font-bold text-black">
              Hey - I'm Samir
            </Link>
            <div className="hidden sm:flex space-x-8">
              <Link href="/profile" className="uppercase text-black hover:text-gray-600">
                Profile
              </Link>
              <Link href="/portfolio" className="uppercase text-black hover:text-gray-600">
                Portfolio
              </Link>
              <Link href="/interspace" className="uppercase text-black hover:text-gray-600">
                Interspace
              </Link>
              <Link href="/perspectives" className="uppercase text-black hover:text-gray-600">
                Perspectives
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {children}
      </main>
    </div>
  );
}