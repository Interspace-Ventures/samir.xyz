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

  // Serve static files from the public directory
  app.use(express.static(path.join(process.cwd(), 'public')));

  // Also serve files from dist/public as a fallback
  app.use(express.static(path.join(process.cwd(), 'dist', 'public')));

  // Handle client-side routing
  app.get('*', (_req, res) => {
    const indexPath = path.join(process.cwd(), 'public', 'index.html');
    res.sendFile(indexPath);
  });

  const httpServer = createServer(app);
  return httpServer;
}