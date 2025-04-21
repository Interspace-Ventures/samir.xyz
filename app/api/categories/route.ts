/**
 * Categories API Route
 * 
 * This API route handles fetching portfolio categories.
 * It retrieves all categories from the database
 * and returns them sorted by order field and then by name.
 */

import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

/**
 * GET handler for /api/categories
 * 
 * Fetches all categories from the database
 * 
 * @returns {Promise<NextResponse>} JSON response with categories or error
 */
export async function GET() {
  try {
    // Query all categories from the database
    const categories = await prisma.category.findMany({
      orderBy: [
        { order: 'asc' }, // Sort by order field first (lower numbers appear first)
        { name: 'asc' },  // Then sort alphabetically by name
      ],
    });

    // Return the categories as JSON
    return NextResponse.json(categories);
  } catch (error) {
    // Log the error and return a 500 response
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}