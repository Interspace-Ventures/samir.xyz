/**
 * Minimal Ventures API Route
 * 
 * This API route provides a minimal version of the ventures data
 * with only essential information for faster loading.
 */

import { NextResponse } from 'next/server';

// Get mini version of ventures data with only essential fields
const minimalVentures = [
  {
    id: 1,
    name: '2 Days Early',
    logoUrl: '/ventures/2DE Interspace.png',
    website: 'https://2daysearly.com'
  },
  {
    id: 2,
    name: 'interspace',
    logoUrl: '/ventures/Interspace Square - 2025.png',
    website: 'https://posts.interspace.ventures'
  },
  {
    id: 3,
    name: 'tbh',
    logoUrl: '/ventures/tbh purple.png',
    website: 'https://tbh.living'
  },
  {
    id: 4,
    name: 'solo',
    logoUrl: '/ventures/Solo Wordmark - Gradient 2025.png',
    website: 'https://solo.iv.xyz'
  },
  {
    id: 5,
    name: 'samir.xyz',
    logoUrl: '/ventures/Perspectives Favicon.png',
    website: 'https://samir.xyz'
  },
  {
    id: 6,
    name: 'predictive',
    logoUrl: '/ventures/Predictive.film icon 2025.png',
    website: 'https://predictive.iv.xyz'
  },
  {
    id: 7,
    name: 'moonshot',
    logoUrl: '/ventures/moonshot.png',
    website: 'https://moonshot.iv.xyz'
  },
  {
    id: 8,
    name: 'omni',
    logoUrl: '/ventures/omni wordmark 2025.png',
    website: 'https://omni.iv.xyz'
  }
];

/**
 * GET handler for /api/ventures-minimal
 * Returns a minimal version of ventures data for faster loading
 */
export async function GET() {
  return NextResponse.json(minimalVentures);
}