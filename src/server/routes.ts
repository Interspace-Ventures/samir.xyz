import type { Express } from "express";
import { createServer, type Server } from "http";
import express from "express";
import path from "path";
import compression from "compression";

export function registerRoutes(app: Express): Server {
  // Enable compression for all requests
  app.use(compression());

  // Serve static files from public directory with caching headers
  const staticOptions = {
    maxAge: '1d',
    etag: true,
    lastModified: true,
    fallthrough: true,
  };

  // Serve static assets from public/assets directory
  app.use('/assets', 
    express.static(path.join(process.cwd(), 'public', 'assets'), staticOptions),
    (err: any, _req: express.Request, res: express.Response, next: express.NextFunction) => {
      if (err) {
        console.error('Static file serving error:', err);
        res.status(404).send('Asset not found');
      } else next();
    }
  );

  const httpServer = createServer(app);
  return httpServer;
}