/**
 * Portfolio Metrics Page (server)
 *
 * Prefetches portfolio data on the server and hydrates it into React Query, so
 * the metrics table renders immediately with no first-visit loading spinner.
 */

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getVisiblePortfolio } from '@/lib/server-data';
import MetricsContent from './metrics-content';

export default async function PortfolioMetricsPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['portfolio'],
    queryFn: getVisiblePortfolio,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MetricsContent />
    </HydrationBoundary>
  );
}
