/**
 * Portfolio Metrics: single source of truth
 *
 * These are the curated headline figures (TVPI, MOIC, IRR, totals) that cannot
 * be derived from the database. The frontend uses them for instant rendering,
 * and the /api/metrics route returns them too (deriving the acquisition count
 * live from the DB), so the numbers only ever live in one place.
 */

export type PortfolioSummary = {
  total_investments: number;
  markups: number;
  acquisitions: number;
  busts: number;
  tvpi: number;
  gross_multiple: number;
  net_multiple: number;
  irr: number;
};

/**
 * Pre-computed metrics that match the values from the API
 * This allows for instant rendering of metrics before API data is fetched
 */
export const staticMetrics: PortfolioSummary = {
  total_investments: 43,
  markups: 23,
  acquisitions: 2,
  busts: 9,
  tvpi: 1.5,
  gross_multiple: 1.7,
  net_multiple: 1.5,
  irr: 12
};