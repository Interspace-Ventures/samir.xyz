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
    // Get full data for detailed ventures display
    const ventures = await prisma.venture.findMany({
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