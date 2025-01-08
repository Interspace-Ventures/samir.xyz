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

  if (process.env.NODE_ENV !== "production") {
    // Development mode - use Vite's dev server
    const vite = await import('vite');
    const viteServer = await vite.createServer({
      root: path.resolve(__dirname, "../client"),
      server: {
        middlewareMode: true,
        hmr: { server }
      },
      appType: "custom"
    });

    app.use(viteServer.middlewares);

    app.use("*", async (req, res, next) => {
      try {
        const indexPath = path.resolve(__dirname, "../client/index.html");
        const template = await import('fs/promises').then(fs => fs.readFile(indexPath, "utf-8"));
        const html = await viteServer.transformIndexHtml(req.originalUrl, template);
        res.status(200).set({ "Content-Type": "text/html" }).end(html);
      } catch (e) {
        next(e);
      }
    });
  } else {
    // Production mode - serve static files from dist
    const publicDir = path.resolve(process.cwd(), "dist", "public");
    console.log('Serving static files from:', publicDir);

    try {
      // Serve static files with proper caching
      app.use(express.static(publicDir, {
        maxAge: '1d',
        etag: true,
        index: false // Let our custom handler deal with serving index.html
      }));

      // Handle SPA routing by serving index.html for all non-file routes
      app.get("*", (req, res, next) => {
        // Log all incoming requests in production for debugging
        console.log(`[Production] Handling request for: ${req.path}`);

        // If the request is for a file, let express.static handle it
        if (path.extname(req.path) !== '') {
          console.log(`[Production] Static file request: ${req.path}`);
          next();
          return;
        }

        // For all other routes, serve index.html for client-side routing
        const indexPath = path.join(publicDir, "index.html");
        console.log(`[Production] Serving index.html from: ${indexPath}`);

        res.sendFile(indexPath, (err) => {
          if (err) {
            console.error(`Error serving index.html: ${err.message}`);
            next(err);
          } else {
            console.log(`[Production] Successfully served index.html for: ${req.path}`);
          }
        });
      });
    } catch (error) {
      console.error(`Error: Could not find the public directory at ${publicDir}`);
      console.error("Make sure to run the build process before starting in production mode");
      throw error;
    }
  }

  const PORT = parseInt(process.env.PORT || "5000", 10);
  server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Mode: ${process.env.NODE_ENV || 'development'}`);
  });
})().catch((error) => {
  console.error("Server startup failed:", error);
  process.exit(1);
});