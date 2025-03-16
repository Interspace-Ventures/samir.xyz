"use client"

import { ThemeToggle } from "@/components/theme-toggle"

export default function TestPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold mb-4">Theme Test Page</h1>
        <div className="flex items-center gap-4">
          <p>Toggle theme:</p>
          <ThemeToggle />
        </div>
        <div className="mt-8 p-4 bg-card text-card-foreground border rounded-lg">
          <p>This is a test card to verify theme colors</p>
        </div>
      </div>
    </div>
  )
}