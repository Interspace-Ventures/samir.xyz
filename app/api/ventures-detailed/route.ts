/**
 * Ventures Detailed API Route
 * 
 * This API route provides complete data for the Ventures grid
 * - All fields are returned for detailed display
 */

import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('Fetching detailed ventures data...');
    
    // Get full data for detailed ventures display
    const ventures = await prisma.venture.findMany({
      orderBy: {
        name: 'asc',
      },
    });
    
    console.log(`Successfully retrieved ${ventures.length} ventures (detailed data)`);
    return NextResponse.json(ventures);
  } catch (error) {
    console.error('Error fetching detailed ventures data:', error);
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