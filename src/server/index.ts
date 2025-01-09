import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import compression from "compression";
import path from "path";

const app = express();
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from public directory with proper MIME types
const staticOptions = {
  maxAge: '1d',
  etag: true,
  lastModified: true,
  setHeaders: (res: Response, filePath: string) => {
    if (filePath.endsWith('.webp')) {
      res.setHeader('Content-Type', 'image/webp');
    }
  }
};

// Serve static assets from public/assets directory with proper error handling
app.use('/assets', 
  express.static(path.join(process.cwd(), 'public', 'assets'), staticOptions),
  (err: any, _req: Request, res: Response, next: NextFunction) => {
    if (err) {
      console.error('Static file serving error:', err);
      res.status(404).send('Asset not found');
    } else next();
  }
);

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }
      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = registerRoutes(app);

  // Error handling middleware
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    console.error('Server error:', err);
    res.status(status).json({ message });
  });

  // Setup Vite or serve static files based on environment
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Always serve on port 5000
  const PORT = Number(process.env.PORT || 5000);
  const server_instance = server.listen(PORT, "0.0.0.0", () => {
    log(`Server running at http://0.0.0.0:${PORT}`);
  });

  // Enable graceful shutdown
  process.on('SIGTERM', () => {
    server_instance.close(() => {
      console.log('Server closed');
      process.exit(0);
    });
  });

})().catch(error => {
  console.error('Failed to start server:', error);
  process.exit(1);
});