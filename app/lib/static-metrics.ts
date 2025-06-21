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
  total_investments: 37,
  markups: 16,
  acquisitions: 3,
  busts: 5,
  tvpi: 1.5,
  gross_multiple: 1.9,
  net_multiple: 1.7,
  irr: 12
};