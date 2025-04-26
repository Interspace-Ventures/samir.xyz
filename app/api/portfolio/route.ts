/**
 * Portfolio API Route
 * 
 * This API route handles fetching portfolio items (companies).
 * It retrieves all portfolio items from the database
 * and returns them sorted by creation date.
 * 
 * It can also include metrics data when the includeMetrics parameter is true.
 */

import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

/**
 * GET handler for /api/portfolio
 * 
 * Fetches all portfolio items from the database
 * 
 * @param {NextRequest} request - The request object with query parameters
 * @returns {Promise<NextResponse>} JSON response with portfolio items or error
 */
export async function GET(request: NextRequest) {
  try {
    // Get the URL to parse query parameters
    const url = new URL(request.url);
    const includeMetrics = url.searchParams.get('includeMetrics') === 'true';
    
    console.log('Attempting to fetch portfolio items from database');
    console.log(`Include metrics: ${includeMetrics}`);
    
    // Query all portfolio items from the database
    const portfolioItems = await prisma.portfolio.findMany({
      orderBy: [
        { createdAt: 'desc' }, // Sort by creation date (newest first)
      ],
    });

    console.log(`Successfully retrieved ${portfolioItems.length} portfolio items`);
    
    // If metrics are requested, format the response accordingly
    if (includeMetrics) {
      // Calculate summary metrics
      const itemsWithInvestmentData = portfolioItems.filter(item => 
        item.investment_date && item.initial_investment && item.current_valuation
      );
      
      const totalInvested = itemsWithInvestmentData.reduce((sum, item) => 
        sum + (item.initial_investment || 0), 0
      );
      
      const totalCurrentValue = itemsWithInvestmentData.reduce((sum, item) => 
        sum + (item.current_valuation || 0), 0
      );
      
      // Return structured response with items and metrics
      return NextResponse.json({
        items: portfolioItems,
        metrics: {
          total_items: portfolioItems.length,
          items_with_investment_data: itemsWithInvestmentData.length,
          total_invested: totalInvested,
          total_current_value: totalCurrentValue,
          overall_multiple: totalInvested > 0 ? totalCurrentValue / totalInvested : 0
        }
      });
    }
    
    // Default response with just the items
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