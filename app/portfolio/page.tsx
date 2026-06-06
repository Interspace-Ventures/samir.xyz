/**
 * Portfolio Page (server)
 *
 * Prefetches portfolio + categories on the server and hydrates them into React
 * Query, so the client grid renders with data already present (no first-visit
 * loading flash).
 */

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getVisiblePortfolio, getCategories } from '@/lib/server-data';
import PortfolioContent from './portfolio-content';

export default async function PortfolioPage() {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['portfolio'],
      queryFn: getVisiblePortfolio,
    }),
    queryClient.prefetchQuery({
      queryKey: ['categories'],
      queryFn: getCategories,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PortfolioContent />
    </HydrationBoundary>
  );
}
