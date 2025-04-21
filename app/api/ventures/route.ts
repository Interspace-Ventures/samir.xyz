/**
 * Ventures API Route
 * 
 * This API route handles fetching ventures for the interspace section.
 * It retrieves all ventures from the database and returns them
 * sorted by creation date (newest first).
 */

import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

/**
 * GET handler for /api/ventures
 * 
 * Fetches all ventures from the database
 * 
 * @returns {Promise<NextResponse>} JSON response with ventures or error
 */
export async function GET() {
  try {
    // Query all ventures from the database
    const ventures = await prisma.venture.findMany({
      orderBy: {
        createdAt: 'desc', // Sort by most recent first
      },
    });

    // Return the ventures as JSON
    return NextResponse.json(ventures);
  } catch (error) {
    // Log the error and return a 500 response
    console.error('Error fetching ventures:', error);
    return NextResponse.json(
      { error: 'Failed to fetch ventures' },
      { status: 500 }
    );
  }
}