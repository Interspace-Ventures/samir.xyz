#!/bin/bash

# Ensure we have static files to serve
if [ ! -d "out" ] || [ ! -f "out/index.html" ]; then
  echo "No static files found. Creating basic site..."
  mkdir -p out
  
  # Create a minimal fallback page
  echo '<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Samir Portfolio - Loading</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 800px; margin: 0 auto; padding: 2rem; }
    h1 { color: #0070f3; }
  </style>
</head>
<body>
  <h1>Samir Portfolio</h1>
  <p>Website is loading...</p>
</body>
</html>' > out/index.html
  
  # Generate more comprehensive static site
  ./generate-simple-site.sh
fi

# Directly start Bun server without any other processes
echo "Starting static file server on port 5000..."
exec bun run --bun bun-simple-server.js