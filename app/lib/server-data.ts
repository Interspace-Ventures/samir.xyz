/**
 * Server-side data access
 *
 * Shared Prisma queries used by BOTH the API routes and the server components
 * that prefetch data for hydration. Keeping them here means the server-rendered
 * pages and the client API responses always return identically shaped data.
 */

import { prisma } from './prisma';

// Companies hidden from the public gallery (placeholders, wound-down deals, etc.)
export const HIDDEN_COMPANIES = ['The Food Company'];

// Ventures shown on the public Ventures page (by their DB names).
const ACTIVE_VENTURES = ['2 Days Early', 'Interspace', 'Universe', 'Structured Liquidity', 'Cosmograph'];

export async function getVisiblePortfolio() {
  // Prisma maps `logoUrl` from the `logo-url` column, so rows are already in the
  // shape the frontend expects.
  const portfolioItems = await prisma.portfolio.findMany({
    orderBy: { createdAt: 'desc' },
  });

  // Filter in JS rather than SQL: a `NOT investment_status = 'Bust'` clause drops
  // rows where the status IS NULL (NOT(NULL) is NULL, not true), which would hide
  // every company that has no status set.
  return portfolioItems.filter(
    (item) =>
      item.investment_status !== 'Bust' &&
      !HIDDEN_COMPANIES.includes(item.name)
  );
}

export async function getCategories() {
  const rows = await prisma.portfolio.findMany({
    select: { category: true },
    distinct: ['category'],
    orderBy: { category: 'asc' },
  });

  return rows.map((row, index) => ({
    id: index + 1,
    name: row.category,
    order: index + 1,
  }));
}

export async function getActiveVentures() {
  return prisma.venture.findMany({
    where: { name: { in: ACTIVE_VENTURES } },
    select: {
      id: true,
      name: true,
      description: true,
      logoUrl: true,
      website: true,
      status: true,
    },
    orderBy: { name: 'asc' },
  });
}
