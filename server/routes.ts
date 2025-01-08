import type { Express } from "express";
import { createServer, type Server } from "http";
import express from "express";
import path from "path";

export function registerRoutes(app: Express): Server {
  // Serve static files from public directory
  app.use('/assets', express.static(path.join(process.cwd(), 'public', 'assets')));
  app.use('/attached_assets', express.static(path.join(process.cwd(), 'public', 'attached_assets')));

  const httpServer = createServer(app);
  return httpServer;
}
