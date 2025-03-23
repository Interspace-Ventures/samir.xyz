#!/bin/bash

echo "Starting parallel Next.js build and Bun server..."

# Make scripts executable
chmod +x *.sh

# Ensure out directory exists
mkdir -p out

# Create a minimal fallback page immediately if nothing exists
if [ ! -f "out/index.html" ]; then
  echo "Creating immediate fallback page..."
  cat > out/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Samir's Portfolio - Loading</title>
  <style>
    body { 
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; 
      line-height: 1.5; 
      color: #333; 
      background-color: #f5f7fa; 
      margin: 0; 
      padding: 2rem 1rem; 
    }
    .container { 
      max-width: 800px; 
      margin: 0 auto; 
      background: white; 
      padding: 2rem; 
      border-radius: 8px; 
      box-shadow: 0 2px 10px rgba(0,0,0,0.1); 
    }
    h1 { color: #1e40af; margin-top: 0; }
    .loader { 
      display: inline-block;
      width: 20px;
      height: 20px;
      border: 3px solid #f3f3f3;
      border-radius: 50%;
      border-top: 3px solid #3498db;
      animation: spin 1s linear infinite;
      margin-left: 10px;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Samir's Portfolio <span class="loader"></span></h1>
    <p>Welcome to my portfolio website. The site is loading...</p>
    <p>If this page doesn't redirect automatically in a few seconds, you can browse these simple pages while the full site loads:</p>
    <ul>
      <li><a href="/portfolio.html">Portfolio</a></li>
      <li><a href="/profile.html">Profile</a></li>
      <li><a href="/ventures.html">Ventures</a></li>
    </ul>
  </div>
</body>
</html>
EOF
fi

# Generate more fallback content
./generate-simple-site.sh

# Start the Bun server in background using nohup to ensure it keeps running
echo "Starting Bun server on port 5000..."
nohup bun run bun-simple-server.js > server.log 2>&1 &
simple_server_pid=$!

# Give the server a moment to start
sleep 2

# Echo a message to confirm server is running
echo "Bun server started with PID $simple_server_pid"
echo "Static content is now available at http://0.0.0.0:5000/"

# Try to build Next.js in the background with a timeout
(
  echo "Starting Next.js build with a 5-minute timeout..."
  timeout 300 bun run next build
  build_status=$?
  
  if [ $build_status -eq 0 ]; then
    echo "Next.js build completed successfully."
    
    # Export the static site
    bun run next export || bun run next build --output=out
    
    # Signal to the simple server that it should use the Next.js output
    touch out/.next-build-complete
    echo "Static export complete. The full site should now be available."
  else
    echo "Next.js build failed or timed out (status: $build_status). Using fallback site."
    # We already generated the fallback site earlier, so no need to do it again
  fi
) &
build_pid=$!

# This script should finish so the workflow knows it's ready,
# but we need to make sure the server keeps running
echo "Setup complete - server is running in background"