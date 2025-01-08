import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import fs from "fs/promises";

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
    try {
      const vite = await createViteServer({
        root: path.resolve(__dirname, "../client"),
        server: {
          middlewareMode: true,
          hmr: { server }
        },
        appType: "custom"
      });

      app.use(vite.middlewares);

      app.use("*", async (req, res, next) => {
        try {
          const indexPath = path.resolve(__dirname, "../client/index.html");
          let template = await fs.readFile(indexPath, "utf-8");
          template = await vite.transformIndexHtml(req.originalUrl, template);
          res.status(200).set({ "Content-Type": "text/html" }).end(template);
        } catch (e) {
          vite.ssrFixStacktrace(e as Error);
          next(e);
        }
      });
    } catch (e) {
      console.error("Vite server setup failed:", e);
      throw e;
    }
  } else {
    // Production mode - serve static files from dist/public
    const publicDir = path.resolve(__dirname, "../dist/public");
    console.log('Serving static files from:', publicDir);

    try {
      await fs.access(publicDir);
      // Serve static files
      app.use(express.static(publicDir));

      // Handle SPA routing by serving index.html for all non-file routes
      app.get("*", (req, res, next) => {
        const requestPath = req.path;
        // If the request has an extension, let express.static handle it
        if (path.extname(requestPath) !== '') {
          next();
          return;
        }
        res.sendFile(path.join(publicDir, "index.html"));
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
  });
})().catch((error) => {
  console.error("Server startup failed:", error);
  process.exit(1);
});