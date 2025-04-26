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

    // Log the successful response for debugging
    console.log(`Successfully fetched ${ventures.length} ventures`);

    // Return the ventures as JSON with appropriate caching headers
    return new NextResponse(JSON.stringify(ventures), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300'
      }
    });
  } catch (error) {
    // Log the error and return a 500 response
    console.error('Error fetching ventures:', error);
    
    // Provide more detailed error message when possible
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'Failed to fetch ventures';
    
    return new NextResponse(
      JSON.stringify({ error: 'Failed to fetch ventures', details: errorMessage }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}