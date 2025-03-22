"use client"

// Absolute minimum client component to avoid any potential hydration issues
export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}