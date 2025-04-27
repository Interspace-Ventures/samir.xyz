import { NextResponse } from 'next/server';

// Mock data for the ventures
const ventures = [
  {
    id: 1,
    name: '2 Days Early',
    description: 'concept incubator',
    logoUrl: '/ventures/2DE Interspace.png',
    website: 'https://2daysearly.com',
    featured: true
  },
  {
    id: 2,
    name: 'interspace',
    description: 'future explorers community',
    logoUrl: '/ventures/Interspace Square - 2025.png',
    website: 'https://posts.interspace.ventures',
    featured: true
  },
  {
    id: 3,
    name: 'tbh',
    description: 'authentic social',
    logoUrl: '/ventures/tbh purple.png',
    website: 'https://tbh.living',
    featured: true
  },
  {
    id: 4,
    name: 'solo',
    description: 'solo living startup',
    logoUrl: '/ventures/Solo Wordmark - Gradient 2025.png',
    website: 'https://solo.iv.xyz',
    featured: true
  },
  {
    id: 5,
    name: 'samir.xyz',
    description: 'personal site',
    logoUrl: '/ventures/Perspectives Favicon.png',
    website: 'https://samir.xyz',
    featured: true
  },
  {
    id: 6,
    name: 'predictive',
    description: 'predictive film studio',
    logoUrl: '/ventures/Predictive.film icon 2025.png',
    website: 'https://predictive.iv.xyz',
    featured: true
  },
  {
    id: 7,
    name: 'moonshot',
    description: 'research-driven products',
    logoUrl: '/ventures/moonshot.png',
    website: 'https://moonshot.iv.xyz',
    featured: true
  },
  {
    id: 8,
    name: 'omni',
    description: 'read anything, anywhere, all at once',
    logoUrl: '/ventures/omni wordmark 2025.png',
    website: 'https://omni.iv.xyz',
    featured: true
  }
];

export async function GET() {
  return NextResponse.json(ventures);
}