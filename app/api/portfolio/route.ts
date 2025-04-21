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
    // Query all portfolio items from the database with their tags
    const portfolioItems = await prisma.portfolio.findMany({
      include: {
        tags: true, // Include the related tags for each portfolio item
      },
      orderBy: [
        { order: 'asc' },     // Sort by order field first (lower numbers appear first)
        { createdAt: 'desc' }, // Then sort by creation date (newest first)
      ],
    });

    // Return the portfolio items as JSON
    return NextResponse.json(portfolioItems);
  } catch (error) {
    // Log the error and return a 500 response
    console.error('Error fetching portfolio items:', error);
    return NextResponse.json(
      { error: 'Failed to fetch portfolio items' },
      { status: 500 }
    );
  }
}