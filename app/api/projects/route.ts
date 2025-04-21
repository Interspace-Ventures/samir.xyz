/**
 * Projects API Route
 * 
 * This API route handles fetching projects for the portfolio section.
 * It retrieves all projects from the database, including their tags,
 * and returns them sorted by creation date (newest first).
 */

import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

/**
 * GET handler for /api/projects
 * 
 * Fetches all projects from the database with their associated tags
 * 
 * @returns {Promise<NextResponse>} JSON response with projects or error
 */
export async function GET() {
  try {
    // Query all projects from the database with their tags
    const projects = await prisma.project.findMany({
      include: {
        tags: true, // Include the related tags for each project
      },
      orderBy: {
        createdAt: 'desc', // Sort by most recent first
      },
    });

    // Return the projects as JSON
    return NextResponse.json(projects);
  } catch (error) {
    // Log the error and return a 500 response
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}