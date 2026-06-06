/**
 * Categories API Route
 * 
 * This API route handles fetching portfolio categories.
 * It retrieves all unique categories from the Portfolio table
 * and returns them as an array of objects with id, name, and order.
 */

import { getCategories } from '@/lib/server-data';
import { NextResponse } from 'next/server';

/**
 * GET handler for /api/categories
 * 
 * Fetches all unique categories from the Portfolio table
 * 
 * @returns {Promise<NextResponse>} JSON response with categories or error
 */
export async function GET() {
  try {
    const categories = await getCategories();

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