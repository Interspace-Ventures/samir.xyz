#!/bin/bash

echo "Verifying navbar implementation..."

# Check if the SVG file exists
echo "Checking if SVG logo file exists..."
if [ -f "public/assets/images/samir-full-logo.svg" ]; then
  echo "✅ SVG logo file exists in public/assets/images/"
  
  # Display file size and modified time
  stat public/assets/images/samir-full-logo.svg
else
  echo "❌ SVG logo file not found in expected location!"
fi

# Check if the SVG file is accessible via the server
echo "Checking if SVG is accessible via HTTP..."
curl -s -I http://localhost:5000/assets/images/samir-full-logo.svg | head -1
if [ $? -eq 0 ]; then
  echo "✅ SVG logo is accessible via HTTP"
else
  echo "❌ SVG logo is not accessible via HTTP"
fi

# Check if the navbar component references the SVG
echo "Checking if navbar component references the SVG..."
if grep -q "samir-full-logo.svg" src/components/layout/ultra-simple-navbar.tsx; then
  echo "✅ Navbar component references the SVG logo"
else
  echo "❌ Navbar component does not reference the SVG logo"
fi

# Check if SVG path appears in the bundled JavaScript
echo "Checking if SVG path is in the JavaScript bundle..."
RESPONSE=$(curl -s http://localhost:5000/_next/static/chunks/src_a673cc4b._.js)
if echo "$RESPONSE" | grep -q "samir-full-logo.svg"; then
  echo "✅ SVG path found in JavaScript bundle"
else
  echo "❌ SVG path not found in JavaScript bundle"
fi

echo "Verification complete!"
