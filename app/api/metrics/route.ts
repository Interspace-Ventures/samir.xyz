/**
 * Portfolio Metrics API Route
 *
 * Returns the headline portfolio figures. These are curated business numbers
 * (TVPI, MOIC, IRR, totals, markups, busts, acquisitions) that cannot be
 * reliably derived from the database, so they live in a single source of truth
 * at `app/lib/static-metrics.ts`. This route just returns them.
 */

import { NextResponse } from 'next/server';
import { staticMetrics } from '../../lib/static-metrics';

export async function GET() {
  return NextResponse.json(staticMetrics);
}
