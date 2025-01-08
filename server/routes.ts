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
    fallthrough: true, // Enable fallback to next middleware
    index: false // Disable directory indexing
  };

  // Error handler for static files
  const handleStaticError = (err: any, res: express.Response) => {
    console.error('Static file serving error:', err);
    res.status(404).send('Asset not found');
  };

  // Serve optimized assets
  app.use('/assets', 
    express.static(path.join(process.cwd(), 'public', 'assets'), staticOptions),
    (err: any, _req: express.Request, res: express.Response, next: express.NextFunction) => {
      if (err) handleStaticError(err, res);
      else next();
    }
  );

  // Serve original assets as fallback
  app.use('/attached_assets', 
    express.static(path.join(process.cwd(), 'public', 'attached_assets'), staticOptions),
    (err: any, _req: express.Request, res: express.Response, next: express.NextFunction) => {
      if (err) handleStaticError(err, res);
      else next();
    }
  );

  const httpServer = createServer(app);
  return httpServer;
}