"use client"

import React, { useEffect, useState } from 'react'
import { companies, categories } from '@/components/data/portfolio'
import type { Company } from '@/components/types'
import Link from 'next/link'

// Define the HTMLImageElement constructor for TypeScript
declare global {
  interface Window {
    Image: {
      new(): HTMLImageElement;
    }
  }
}

// Debug component to verify image loading
const ImageDebugger = ({ src, alt }: { src: string, alt: string }) => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [dimensions, setDimensions] = useState<{ width: number, height: number } | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const img = new window.Image()
    img.onload = () => {
      setStatus('success')
      setDimensions({ width: img.naturalWidth, height: img.naturalHeight })
    }
    img.onerror = () => setStatus('error')
    img.src = src
  }, [src])

  const statusColors = {
    loading: 'text-yellow-500',
    success: 'text-green-500',
    error: 'text-red-500'
  }

  return (
    <div className="p-2 border border-gray-700 rounded-md mb-2">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm overflow-hidden text-ellipsis whitespace-nowrap max-w-[60%]">
          {alt}
        </div>
        <div className={`text-sm font-bold ${statusColors[status]}`}>
          {status.toUpperCase()}
        </div>
      </div>
      <div className="text-xs text-gray-400 truncate">{src}</div>
      {dimensions && (
        <div className="text-xs text-purple-400 mt-1">
          {dimensions.width} × {dimensions.height}
        </div>
      )}
    </div>
  )
}

export default function DebugPortfolioPage() {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            Portfolio Debug
          </h1>
          <Link 
            href="/portfolio" 
            className="px-4 py-2 bg-purple-700 rounded-md hover:bg-purple-600 transition-colors"
          >
            Back to Portfolio
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Image Loading Status</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {companies.map((company) => (
                <ImageDebugger 
                  key={company.name} 
                  src={company.logo} 
                  alt={company.name} 
                />
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">CSS Grid Test</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {companies.slice(0, 6).map((company, index) => (
                <div 
                  key={index} 
                  className="h-[160px] rounded-xl border border-gray-800 bg-gradient-to-br from-purple-900/20 to-black"
                >
                  <div className="h-full flex items-center justify-center">
                    <span className="text-xl">{company.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Directory Structure</h2>
            <pre className="bg-gray-900 p-4 rounded-lg text-sm overflow-auto max-h-[300px]">
              {JSON.stringify(
                companies.map(c => ({
                  name: c.name,
                  logo: c.logo,
                  category: c.category
                })), 
                null, 2
              )}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}