/**
 * Ventures Detailed API Route
 * 
 * This API route provides complete data for the Ventures grid
 * - All fields are returned for detailed display
 */

import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// Cache the ventures data for 60 seconds
let venturesCache: { data: any; timestamp: number } | null = null;
const CACHE_DURATION = 60 * 1000; // 60 seconds

export async function GET() {
  try {
    // Check if cache is valid
    if (venturesCache && Date.now() - venturesCache.timestamp < CACHE_DURATION) {
      return NextResponse.json(venturesCache.data);
    }
    
    // Only show active ventures (using actual database names)
    const activeVentures = ['2 Days Early', 'Interspace'];
    
    // Get full data for detailed ventures display
    const ventures = await prisma.venture.findMany({
      where: {
        name: {
          in: activeVentures
        }
      },
      select: {
        id: true,
        name: true,
        description: true,
        logoUrl: true,
        website: true,
        status: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
    
    // Update cache
    venturesCache = { data: ventures, timestamp: Date.now() };
    
    return NextResponse.json(ventures);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch detailed ventures data',
        details: errorMessage 
      },
      { status: 500 }
    );
  }
}