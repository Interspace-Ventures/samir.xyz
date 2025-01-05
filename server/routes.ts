import type { Express } from "express";
import { createServer, type Server } from "http";
import express from "express";
import path from "path";

export function registerRoutes(app: Express): Server {
  // Serve static assets from attached_assets directory
  app.use('/assets', express.static(path.join(process.cwd(), 'attached_assets')));

  // Serve static files from the client build directory in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(process.cwd(), 'dist', 'public')));
  }

  // API routes
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  // For client-side routing in production, serve index.html for all non-API routes
  if (process.env.NODE_ENV === 'production') {
    app.get('*', (_req, res) => {
      res.sendFile(path.join(process.cwd(), 'dist', 'public', 'index.html'));
    });
  }

  const httpServer = createServer(app);
  return httpServer;
}