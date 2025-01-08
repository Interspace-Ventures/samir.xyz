import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure we're in production mode
process.env.NODE_ENV = 'production';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Setup request logging
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
      console.log(logLine);
    }
  });
  next();
});

(async () => {
  // Check if port is in use and exit if it is
  try {
    const net = await import('net');
    const server = net.createServer();

    await new Promise((resolve, reject) => {
      server.once('error', (err) => {
        if (err.code === 'EADDRINUSE') {
          console.error('Port 5000 is already in use. Please ensure no other server is running.');
          process.exit(1);
        }
        reject(err);
      });

      server.once('listening', () => {
        server.close();
        resolve(true);
      });

      server.listen(5000, '0.0.0.0');
    });
  } catch (err) {
    console.error('Error checking port availability:', err);
    process.exit(1);
  }

  const server = registerRoutes(app);

  // Error handling middleware
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    console.error('Error:', err);
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
  });

  // Production mode - serve static files from dist/public
  const publicDir = path.join(process.cwd(), "dist", "public");

  // Verify public directory exists
  const fs = await import('fs');
  if (!fs.existsSync(publicDir)) {
    console.error(`Error: Public directory not found at ${publicDir}`);
    console.error('Please ensure you have run the build process first');
    process.exit(1);
  }

  console.log('Serving static files from:', publicDir);

  // Serve static files with proper caching
  app.use(express.static(publicDir, {
    maxAge: '1d',
    etag: true,
    index: false,
    setHeaders: (res, filePath) => {
      // Cache assets for 1 year
      if (filePath.includes('/assets/')) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      } else {
        // Cache other files for 1 hour
        res.setHeader('Cache-Control', 'public, max-age=3600');
      }
    }
  }));

  // SPA fallback - serve index.html for all non-file requests
  app.get("*", (req, res, next) => {
    // Skip API routes
    if (req.path.startsWith('/api')) {
      return next();
    }

    // If it's a file request with extension, let express.static handle it
    if (path.extname(req.path)) {
      return next();
    }

    // For all other routes, serve index.html
    const indexPath = path.join(publicDir, "index.html");
    console.log(`Serving SPA fallback for path: ${req.path}`);

    res.sendFile(indexPath, (err) => {
      if (err) {
        console.error(`Error serving index.html for ${req.path}:`, err);
        next(err);
      }
    });
  });

  const PORT = parseInt(process.env.PORT || "5000", 10);
  const HOST = "0.0.0.0";

  // Add graceful shutdown handler before starting the server
  process.on('SIGTERM', () => {
    console.log('Received SIGTERM signal, shutting down gracefully');
    server.close(() => {
      console.log('Server closed');
      process.exit(0);
    });
  });

  server.listen(PORT, HOST, () => {
    console.log(`Production server running on http://${HOST}:${PORT}`);
    console.log(`Mode: ${process.env.NODE_ENV}`);
    console.log('Current working directory:', process.cwd());
  });
})().catch((error) => {
  console.error("Server startup failed:", error);
  process.exit(1);
});