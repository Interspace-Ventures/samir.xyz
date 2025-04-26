'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import VenturesGrid from './ventures-grid';

// This is a compatibility component that redirects to the new ventures grid
// or renders the VenturesGrid directly if needed for backward compatibility
export default function InterspaceSection() {
  return <VenturesGrid />;
}