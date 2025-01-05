import type { Express } from "express";
import { createServer, type Server } from "http";
import express from "express";
import path from "path";

export function registerRoutes(app: Express): Server {
  // API routes
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  // Serve static assets from attached_assets directory
  app.use('/assets', express.static(path.join(process.cwd(), 'attached_assets')));

  // Serve static files from the dist/public directory first (production build)
  app.use(express.static(path.join(process.cwd(), 'dist', 'public')));

  // Fall back to development public directory
  app.use(express.static(path.join(process.cwd(), 'public')));

  // Always return index.html for client-side routing
  app.get('*', (_req, res) => {
    // Try production build first
    const productionPath = path.join(process.cwd(), 'dist', 'public', 'index.html');
    if (process.env.NODE_ENV === 'production' && require('fs').existsSync(productionPath)) {
      res.sendFile(productionPath);
    } else {
      // Fall back to development index.html
      res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}