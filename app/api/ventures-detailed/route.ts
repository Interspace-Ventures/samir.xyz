/**
 * Ventures Detailed API Route
 * 
 * This API route provides complete data for the Ventures grid
 * - All fields are returned for detailed display
 */

import { getActiveVentures } from '@/lib/server-data';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const ventures = await getActiveVentures();

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