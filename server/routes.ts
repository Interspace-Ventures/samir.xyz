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

  // Always serve static files from the dist/public directory
  app.use(express.static(path.join(process.cwd(), 'dist', 'public')));

  // For client-side routing, serve index.html for all non-API routes
  app.get('*', (_req, res) => {
    res.sendFile(path.join(process.cwd(), 'dist', 'public', 'index.html'));
  });

  const httpServer = createServer(app);
  return httpServer;
}