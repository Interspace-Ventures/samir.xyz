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

// Define a type for the raw database item (with kebab-case field)
type DatabasePortfolioItem = {
  id: number;
  name: string;
  category: string;
  description: string | null;
  website: string | null;
  'logo-url': string; // Kebab-case field from database
  investment_date: Date | null;
  initial_investment: number | null;
  original_valuation: number | null;
  current_valuation: number | null;
  investment_status: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// Define a type for the frontend-friendly version (with camelCase)
type PortfolioItem = {
  id: number;
  name: string;
  category: string;
  description: string | null;
  website: string | null;
  logoUrl: string; // Renamed to camelCase for frontend
  investment_date: Date | null;
  initial_investment: number | null;
  original_valuation: number | null;
  current_valuation: number | null;
  investment_status: string | null;
  createdAt: Date;
  updatedAt: Date;
}

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
    
    // Removed console logs for performance
    
    // Query all portfolio items from the database.
    // NOTE: We intentionally do NOT filter in SQL here. A SQL/Prisma
    // `NOT: { investment_status: 'Bust' }` clause silently drops rows where
    // investment_status IS NULL (since NOT(NULL = 'Bust') is NULL, not true),
    // which was hiding every company that has no status set. We filter in JS
    // below instead so NULL-status companies still display.
    const portfolioItems = await prisma.portfolio.findMany({
      orderBy: [
        { createdAt: 'desc' }, // Sort by creation date (newest first)
      ],
    });
    
    // Removed debug logging for performance
    
    // Map the database field names to the frontend expected property names
    const mappedItems = portfolioItems.map(item => {
      // Use type assertion to access the kebab-case property
      const rawItem = item as any;
      
      // Debug the raw item to see all available fields
      // console.log(`Item ${item.name} raw data:`, rawItem);
      
      // Get the logo URL from whatever field it's available in
      const logoUrl = item.logoUrl || rawItem['logo-url'] || rawItem.logoUrl || '';
      
      return {
        id: item.id,
        name: item.name,
        category: item.category,
        description: item.description,
        website: item.website,
        logoUrl: logoUrl, // Use the found logo URL
        investment_date: item.investment_date,
        initial_investment: item.initial_investment,
        original_valuation: item.original_valuation,
        current_valuation: item.current_valuation,
        investment_status: item.investment_status,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt
      };
    });

    // Exclude busted companies and the placeholder company from display.
    // Done in JS (not SQL) so that companies with a NULL investment_status
    // are still shown — see note on the findMany query above.
    const visibleItems = mappedItems.filter(item =>
      item.name !== 'The Food Company' && item.investment_status !== 'Bust'
    );

    // If metrics are requested, format the response accordingly
    if (includeMetrics) {
      // Calculate summary metrics
      const itemsWithInvestmentData = visibleItems.filter(item => 
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
        items: visibleItems,
        metrics: {
          total_items: visibleItems.length,
          items_with_investment_data: itemsWithInvestmentData.length,
          total_invested: totalInvested,
          total_current_value: totalCurrentValue,
          overall_multiple: totalInvested > 0 ? totalCurrentValue / totalInvested : 0
        }
      });
    }
    
    // Default response with just the items
    return NextResponse.json(visibleItems);
  } catch (error) {
    // Get error details without logging
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch portfolio items',
        details: errorMessage 
      },
      { status: 500 }
    );
  }
}