import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
  const server = registerRoutes(app);

  // Error handling middleware
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    console.error('Error:', err);
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
  });

  if (process.env.NODE_ENV === "production") {
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
  } else {
    // Development mode - use Vite's dev server
    const { createServer: createViteServer } = await import('vite');
    const viteServer = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: { server }
      },
      appType: "custom"
    });

    app.use(viteServer.middlewares);

    // Handle SPA in development
    app.use("*", async (req, res, next) => {
      try {
        const fs = await import('fs/promises');
        const template = await fs.readFile(
          path.resolve(__dirname, "../client/index.html"),
          "utf-8"
        );
        const html = await viteServer.transformIndexHtml(req.originalUrl, template);
        res.status(200).set({ "Content-Type": "text/html" }).end(html);
      } catch (e) {
        console.error('Error serving development index.html:', e);
        next(e);
      }
    });
  }

  const PORT = parseInt(process.env.PORT || "5000", 10);
  const HOST = "0.0.0.0";

  server.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
    console.log(`Mode: ${process.env.NODE_ENV || 'development'}`);
    console.log('Current working directory:', process.cwd());
  });
})().catch((error) => {
  console.error("Server startup failed:", error);
  process.exit(1);
});