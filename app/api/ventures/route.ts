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
    console.log('Fetching ventures data from database...');
    
    const ventures = await prisma.venture.findMany({
      orderBy: {
        name: 'asc',
      },
    });
    
    console.log(`Successfully retrieved ${ventures.length} ventures`);
    return NextResponse.json(ventures);
  } catch (error) {
    console.error('Error fetching ventures data:', error);
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