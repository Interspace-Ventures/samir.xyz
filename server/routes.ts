import type { Express } from "express";
import { createServer, type Server } from "http";
import express from "express";
import path from "path";

export function registerRoutes(app: Express): Server {
  // Serve static assets from attached_assets directory
  app.use('/assets', express.static(path.join(process.cwd(), 'attached_assets')));

  // prefix all API routes with /api
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  const httpServer = createServer(app);

  return httpServer;
}