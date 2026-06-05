import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * Ventures API Route
 * 
 * This endpoint returns all venture data including the status field
 * that's used to display the "Pre-launch" tag.
 */
export async function GET() {
  try {

    
    // Only show active ventures (using actual database names)
    const activeVentures = ['2 Days Early', 'Interspace', 'Verse', 'Spacebase', 'Orbit'];
    
    const ventures = await prisma.venture.findMany({
      where: {
        name: {
          in: activeVentures
        }
      },
      orderBy: {
        name: 'asc',
      },
    });
    

    return NextResponse.json(ventures);
  } catch (error) {

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch ventures data',
        details: errorMessage 
      },
      { status: 500 }
    );
  }
}