import { createRequestHandler } from "@remix-run/node";
import { installGlobals } from "@remix-run/node";

// Install globals required by Remix
installGlobals();

// This file is used as the entry point for the Remix server
// It's referenced in remix.config.js

// No need to create an Express instance or HTTP server here
// Remix's built-in CLI handles that for us

// Create a request handler that Remix will use internally
export default createRequestHandler({
  // The build will be imported dynamically by Remix
  mode: process.env.NODE_ENV,
});