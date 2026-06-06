/**
 * Portfolio API Route
 *
 * Returns portfolio companies from the database, newest first. Pass
 * `?includeMetrics=true` to also receive aggregate investment figures.
 */

import { prisma } from '@/lib/prisma';
import { NextResponse, type NextRequest } from 'next/server';

// Companies hidden from the public gallery (placeholders, wound-down deals, etc.)
const HIDDEN_COMPANIES = ['The Food Company'];

export async function GET(request: NextRequest) {
  try {
    const includeMetrics =
      new URL(request.url).searchParams.get('includeMetrics') === 'true';

    // Prisma maps `logoUrl` from the `logo-url` column, so the rows are already
    // in the shape the frontend expects.
    const portfolioItems = await prisma.portfolio.findMany({
      orderBy: { createdAt: 'desc' },
    });

    // Filter in JS rather than SQL: a `NOT investment_status = 'Bust'` clause
    // drops rows where the status IS NULL (NOT(NULL) is NULL, not true), which
    // would hide every company that has no status set.
    const visibleItems = portfolioItems.filter(
      (item) =>
        item.investment_status !== 'Bust' &&
        !HIDDEN_COMPANIES.includes(item.name)
    );

    if (!includeMetrics) {
      return NextResponse.json(visibleItems);
    }

    const itemsWithInvestmentData = visibleItems.filter(
      (item) =>
        item.investment_date &&
        item.initial_investment &&
        item.current_valuation
    );

    const totalInvested = itemsWithInvestmentData.reduce(
      (sum, item) => sum + (item.initial_investment ?? 0),
      0
    );
    const totalCurrentValue = itemsWithInvestmentData.reduce(
      (sum, item) => sum + (item.current_valuation ?? 0),
      0
    );

    return NextResponse.json({
      items: visibleItems,
      metrics: {
        total_items: visibleItems.length,
        items_with_investment_data: itemsWithInvestmentData.length,
        total_invested: totalInvested,
        total_current_value: totalCurrentValue,
        overall_multiple:
          totalInvested > 0 ? totalCurrentValue / totalInvested : 0,
      },
    });
  } catch (error) {
    // Log server-side; do not leak internal details to the client.
    console.error('Error fetching portfolio items:', error);
    return NextResponse.json(
      { error: 'Failed to fetch portfolio items' },
      { status: 500 }
    );
  }
}
