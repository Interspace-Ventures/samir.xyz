#!/bin/bash

echo "Testing Next.js server on port 5000..."

# Use curl with a short timeout to test if the server is responding
if curl -s --head --fail --max-time 5 http://localhost:5000/ > /dev/null; then
  echo "✅ Server is responding at http://localhost:5000/"
  # Try to fetch the page content
  response=$(curl -s --max-time 5 http://localhost:5000/)
  
  # Simple check to see if there's content in the response
  if [[ -n "$response" ]]; then
    echo "✅ Server is returning content"
    
    # Check for specific HTML elements that should be present
    if [[ $response == *"<html"* && $response == *"<body"* ]]; then
      echo "✅ Found HTML structure"
    else
      echo "❌ HTML structure not found in response"
    fi
  else
    echo "❌ Server response is empty"
  fi
else
  echo "❌ Server is not responding at http://localhost:5000/"
fi

echo "Testing specific routes:"
for route in "/profile/" "/ventures/" "/portfolio/"; do
  if curl -s --head --fail --max-time 5 "http://localhost:5000${route}" > /dev/null; then
    echo "✅ Server is responding at http://localhost:5000${route}"
  else
    echo "❌ Server is not responding at http://localhost:5000${route}"
  fi
done