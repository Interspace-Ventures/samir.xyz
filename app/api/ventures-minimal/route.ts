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
    console.log('Fetching minimal ventures data...');
    
    // Get only the essential fields needed for minimal display
    const ventures = await prisma.venture.findMany({
      select: {
        id: true,
        name: true,
        logoUrl: true,
        description: true, // We'll truncate this in the component if needed
        website: true,
        status: true, // Include status field for "Pre-launch" tag
      },
      orderBy: {
        name: 'asc',
      },
    });
    
    console.log(`Successfully retrieved ${ventures.length} ventures (minimal data)`);
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