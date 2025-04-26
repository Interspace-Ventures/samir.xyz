/**
 * Ventures API Route
 * 
 * This API route handles fetching ventures for the interspace section.
 * It retrieves all ventures from the database and returns them
 * sorted by creation date (newest first).
 */

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Use the pre-generated ventures data
const VENTURES_FILE = path.join(process.cwd(), 'scripts', 'ventures-response.json');

/**
 * GET handler for /api/ventures
 * 
 * Fetches all ventures
 * 
 * @returns {Promise<NextResponse>} JSON response with ventures or error
 */
export async function GET() {
  try {
    // Read ventures from the file
    const venturesData = fs.readFileSync(VENTURES_FILE, 'utf8');
    const ventures = JSON.parse(venturesData);
    
    // Log the successful response for debugging
    console.log(`Successfully fetched ${ventures.length} ventures from file`);
    
    // Return the ventures as JSON
    return NextResponse.json(ventures);
  } catch (error) {
    // Log the error and return a 500 response
    console.error('Error fetching ventures:', error);
    
    // Provide more detailed error message when possible
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'Failed to fetch ventures';
    
    return NextResponse.json(
      { error: 'Failed to fetch ventures', details: errorMessage }, 
      { status: 500 }
    );
  }
}