/**
 * Portfolio Metrics API Route
 *
 * Returns the headline portfolio figures. Curated numbers that cannot be
 * derived from the database (TVPI, MOIC, IRR, etc.) come from a single source
 * of truth in `app/lib/static-metrics.ts`; the acquisition count is derived
 * live from the database.
 */

import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { staticMetrics } from '../../lib/static-metrics';

export async function GET() {
  try {
    const acquisitions = await prisma.portfolio.count({
      where: { investment_status: { in: ['Acquired', 'Exited'] } },
    });

    return NextResponse.json({ ...staticMetrics, acquisitions });
  } catch (error) {
    console.error('Error fetching metrics summary:', error);
    return NextResponse.json(
      { error: 'Failed to fetch metrics data' },
      { status: 500 }
    );
  }
}
