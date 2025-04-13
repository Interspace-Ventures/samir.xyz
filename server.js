// Simple server for Remix
import { createRequestHandler } from "@remix-run/node";
import * as path from "path";
import * as url from "url";

// ES Module workarounds
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const BUILD_DIR = path.join(__dirname, "build");

// Create the request handler from the built Remix app
// https://remix.run/docs/en/main/start/quickstart#create-a-request-handler
const handler = createRequestHandler({
  build: await import(BUILD_DIR),
  mode: process.env.NODE_ENV,
});

// Create the server
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { serveStatic } from "@hono/node-server/serve-static";

const app = new Hono();

// Serve static files
app.use("/build/*", serveStatic({ root: "./" }));
app.use("/logos/*", serveStatic({ root: "./public" }));

// Handle all other requests with Remix
app.use("*", async (c) => {
  const req = c.req.raw;
  const res = await handler(req);
  return res;
});

// Start the server
const port = process.env.PORT || 3000;
console.log(`Server listening on http://localhost:${port}`);
serve({
  fetch: app.fetch,
  port: port,
});