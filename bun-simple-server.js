// A super simple static file server using Bun's built-in capabilities
// This avoids any ES modules vs CommonJS compatibility issues

import { serve } from "bun";
import { join } from "path";
import { readFileSync, existsSync, statSync } from "fs";

const PORT = 5000;
const STATIC_DIR = "./out";

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

// Create a 404 page
const notFoundHTML = `
<!DOCTYPE html>
<html>
<head>
  <title>404 - Page Not Found</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: system-ui, sans-serif; max-width: 800px; margin: 0 auto; padding: 2rem; line-height: 1.6; color: #333; }
    h1 { color: #e53e3e; }
    a { color: #0070f3; text-decoration: none; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <h1>404 - Page Not Found</h1>
  <p>The page you're looking for doesn't exist.</p>
  <p><a href="/">Go back to Home</a></p>
</body>
</html>
`;

// Helper function to determine the file extension and content type
function getContentType(filePath) {
  const ext = filePath.substring(filePath.lastIndexOf('.'));
  return MIME_TYPES[ext] || "application/octet-stream";
}

// Function to try loading different file variations
function tryLoadFile(requestPath) {
  // Try the direct path first
  const directPath = join(STATIC_DIR, requestPath);
  if (existsSync(directPath)) {
    const stats = statSync(directPath);
    if (stats.isDirectory()) {
      // If it's a directory, try index.html
      const indexPath = join(directPath, "index.html");
      if (existsSync(indexPath)) {
        return {
          content: readFileSync(indexPath),
          contentType: "text/html"
        };
      }
    } else {
      // It's a file, serve it
      return {
        content: readFileSync(directPath),
        contentType: getContentType(directPath)
      };
    }
  }

  // Try adding .html extension
  if (!requestPath.includes('.')) {
    const htmlPath = `${directPath}.html`;
    if (existsSync(htmlPath)) {
      return {
        content: readFileSync(htmlPath),
        contentType: "text/html"
      };
    }
  }

  // If we get here, file wasn't found
  return null;
}

// Start the server
console.log(`Starting Bun static server on port ${PORT}...`);
console.log(`Serving files from ${STATIC_DIR}`);

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

    // Handle OPTIONS requests for CORS
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type"
        }
      });
    }

    // Try to load the file
    const fileData = tryLoadFile(path);
    if (fileData) {
      return new Response(fileData.content, {
        status: 200,
        headers: {
          "Content-Type": fileData.contentType,
          "Access-Control-Allow-Origin": "*"
        }
      });
    }

    // Return 404 if file not found
    return new Response(notFoundHTML, {
      status: 404,
      headers: {
        "Content-Type": "text/html",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
});

console.log(`Server running at http://0.0.0.0:${PORT}/`);