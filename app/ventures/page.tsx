/**
 * Ventures Page (server)
 *
 * Fetches active ventures on the server and passes them to the client component,
 * so the grid renders immediately with no first-visit loading flash.
 */

import { getActiveVentures } from '@/lib/server-data';
import VenturesContent from './ventures-content';

export default async function VenturesPage() {
  const ventures = await getActiveVentures();

  return <VenturesContent ventures={ventures} />;
}
