/**
 * Companies API Route
 * 
 * This API route handles fetching companies for the portfolio section.
 * It retrieves all companies from the database, including their tags,
 * and returns them sorted by order field and then by creation date.
 */

import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

/**
 * GET handler for /api/companies
 * 
 * Fetches all companies from the database with their associated tags
 * 
 * @returns {Promise<NextResponse>} JSON response with companies or error
 */
export async function GET() {
  try {
    // Query all companies from the database with their tags
    const companies = await prisma.company.findMany({
      include: {
        tags: true, // Include the related tags for each company
      },
      orderBy: [
        { order: 'asc' },     // Sort by order field first (lower numbers appear first)
        { createdAt: 'desc' }, // Then sort by creation date (newest first)
      ],
    });

    // Return the companies as JSON
    return NextResponse.json(companies);
  } catch (error) {
    // Log the error and return a 500 response
    console.error('Error fetching companies:', error);
    return NextResponse.json(
      { error: 'Failed to fetch companies' },
      { status: 500 }
    );
  }
}