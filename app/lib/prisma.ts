/**
 * Prisma Client Singleton
 * 
 * This module creates a single instance of PrismaClient to be used throughout the application.
 * It prevents multiple instances of PrismaClient in development environment when
 * the application hot-reloads.
 * 
 * In development, we attach the PrismaClient instance to the global object,
 * which ensures only one connection is created.
 */

import { PrismaClient } from '@prisma/client';

// Define a global type for PrismaClient
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Create a singleton instance of PrismaClient
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

// Save PrismaClient to the global object in non-production environments
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;