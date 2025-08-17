/**
 * Static Portfolio Metrics Data
 * 
 * This file contains pre-computed portfolio metrics for faster initial loading.
 * These values match the standard metrics used across the portfolio analytics.
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
  total_investments: 42,
  markups: 16,
  acquisitions: 2,
  busts: 8,
  tvpi: 1.5,
  gross_multiple: 1.7,
  net_multiple: 1.5,
  irr: 12
};