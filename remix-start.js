// This is a special entry script for Remix with React 19 compat
import * as path from 'path';
import * as fs from 'fs';
import * as express from 'express';
import { createRequestHandler } from '@remix-run/express';

const app = express();
const port = process.env.PORT || 5000;

// http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
app.disable("x-powered-by");

// Remix fingerprints its assets so we can cache forever.
app.use(
  "/build",
  express.static("public/build", { immutable: true, maxAge: "1y" })
);

// Everything else (like favicon.ico) is cached for an hour. You may want to be
// more aggressive with this caching.
app.use(express.static("public", { maxAge: "1h" }));

app.use(
  "/",
  createRequestHandler({
    build: { 
      mode: process.env.NODE_ENV,
      publicPath: "/build/",
      assetsBuildDirectory: path.join(process.cwd(), "public/build"),
      serverBuildPath: path.join(process.cwd(), "build/index.js"),
      serverModuleFormat: "esm",
    },
    mode: process.env.NODE_ENV,
    getLoadContext(req, res) {
      return {};
    },
  })
);

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});