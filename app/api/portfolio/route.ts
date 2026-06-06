/**
 * Portfolio API Route
 *
 * Returns portfolio companies from the database, newest first. Pass
 * `?includeMetrics=true` to also receive aggregate investment figures.
 */

import { getVisiblePortfolio } from '@/lib/server-data';
import { NextResponse, type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const includeMetrics =
      new URL(request.url).searchParams.get('includeMetrics') === 'true';

    const visibleItems = await getVisiblePortfolio();

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
