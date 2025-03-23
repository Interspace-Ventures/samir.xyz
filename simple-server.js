#!/usr/bin/env bun

import { serve } from "bun";
import { join } from "path";
import { readFileSync, existsSync, statSync } from "fs";

const PORT = process.env.PORT || 5000;
const STATIC_DIR = "./out";

console.log(`Starting simple server on port ${PORT}`);
console.log(`Serving files from ${STATIC_DIR}`);

// Define MIME types for common file extensions
const MIME_TYPES = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".txt": "text/plain",
  ".webp": "image/webp"
};

function getContentType(filePath) {
  const ext = filePath.substring(filePath.lastIndexOf('.'));
  return MIME_TYPES[ext] || "application/octet-stream";
}

serve({
  port: PORT,
  hostname: "0.0.0.0",
  
  fetch(request) {
    const url = new URL(request.url);
    let path = url.pathname;
    
    // Normalize root path to index.html
    if (path === "/") {
      path = "/index.html";
    }

    console.log(`${new Date().toISOString()} - ${request.method} ${path}`);
    
    const filePath = join(STATIC_DIR, path);
    
    try {
      if (existsSync(filePath)) {
        const stats = statSync(filePath);
        
        if (stats.isDirectory()) {
          // Try index.html in directory
          const indexPath = join(filePath, "index.html");
          if (existsSync(indexPath)) {
            const content = readFileSync(indexPath);
            return new Response(content, {
              status: 200,
              headers: { "Content-Type": "text/html" }
            });
          }
        } else {
          // Regular file
          const content = readFileSync(filePath);
          return new Response(content, {
            status: 200,
            headers: { "Content-Type": getContentType(filePath) }
          });
        }
      }
      
      // Try with .html extension if no extension in request
      if (!path.includes('.')) {
        const htmlPath = `${filePath}.html`;
        if (existsSync(htmlPath)) {
          const content = readFileSync(htmlPath);
          return new Response(content, {
            status: 200,
            headers: { "Content-Type": "text/html" }
          });
        }
      }
      
      // Return 404 if not found
      return new Response("Not found", { 
        status: 404,
        headers: { "Content-Type": "text/plain" }
      });
    } catch (error) {
      console.error(`Error serving ${path}:`, error);
      return new Response("Server error", { 
        status: 500,
        headers: { "Content-Type": "text/plain" }
      });
    }
  }
});

console.log(`Server running at http://0.0.0.0:${PORT}/`);