"use client"

import dynamic from 'next/dynamic';

// Dynamically load the client component with no SSR to avoid hydration errors
const PortfolioClient = dynamic(() => import('./portfolio-client'), { ssr: false });

export default function ClientWrapper() {
  return <PortfolioClient />;
}