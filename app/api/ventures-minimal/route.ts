/**
 * Ventures Minimal API Route
 * 
 * This API route provides just the minimal data needed for the Ventures grid
 * - Only name, logoUrl, and brief description fields are returned for faster loading
 */

import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {

    
    // Only show active ventures (using actual database names)
    const activeVentures = ['2 Days Early', 'Interspace', 'Verse', 'Spacebase', 'Orbit'];
    
    // Get only the essential fields needed for minimal display
    const ventures = await prisma.venture.findMany({
      where: {
        name: {
          in: activeVentures
        }
      },
      select: {
        id: true,
        name: true,
        logoUrl: true,
        description: true, // We'll truncate this in the component if needed
        website: true,
        status: true,
        category: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
    

    return NextResponse.json(ventures);
  } catch (error) {
    console.error('Error fetching minimal ventures data:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch minimal ventures data',
        details: errorMessage 
      },
      { status: 500 }
    );
  }
}