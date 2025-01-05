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

  const httpServer = createServer(app);
  return httpServer;
}