/**
 * Portfolio API Route
 * 
 * This API route handles fetching portfolio items (companies).
 * It retrieves all portfolio items from the database, including their tags,
 * and returns them sorted by order field and then by creation date.
 */

import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

/**
 * GET handler for /api/portfolio
 * 
 * Fetches all portfolio items from the database with their associated tags
 * 
 * @returns {Promise<NextResponse>} JSON response with portfolio items or error
 */
export async function GET() {
  try {
    console.log('Attempting to fetch portfolio items from database');
    // Query all portfolio items from the database with their tags
    const portfolioItems = await prisma.portfolio.findMany({
      include: {
        tags: true, // Include the related tags for each portfolio item
      },
      orderBy: [
        { createdAt: 'desc' }, // Sort by creation date (newest first)
      ],
    });

    console.log(`Successfully retrieved ${portfolioItems.length} portfolio items`);
    // Return the portfolio items as JSON
    return NextResponse.json(portfolioItems);
  } catch (error) {
    // Log the error details
    console.error('Error fetching portfolio items:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : '';
    console.error('Error message:', errorMessage);
    console.error('Error stack:', errorStack);
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch portfolio items',
        details: errorMessage 
      },
      { status: 500 }
    );
  }
}