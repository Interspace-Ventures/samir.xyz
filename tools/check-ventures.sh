#!/bin/bash
echo "Attempting to fetch the ventures page..."
url="https://d2193f08-b592-45ce-b730-8dc2c7ef133c-00-1f1txs3yeigba.janeway.replit.dev/ventures/"
output=$(curl -s "$url")

echo "Checking for grid layout..."
if echo "$output" | grep -q "grid grid-cols"; then
  echo "✅ Found grid layout CSS classes"
  echo "Grid definition:"
  echo "$output" | grep -o "grid grid-cols[^\"]*"
else
  echo "❌ No grid layout CSS classes found"
fi

echo -e "\nChecking for card components..."
if echo "$output" | grep -q "VenturesCard"; then
  echo "✅ Found VenturesCard components"
  count=$(echo "$output" | grep -c "VenturesCard")
  echo "Number of VenturesCard instances: $count"
else
  echo "❌ No VenturesCard components found"
fi

echo -e "\nChecking image handling..."
if echo "$output" | grep -q "img"; then
  echo "✅ Found img tags"
  count=$(echo "$output" | grep -c "img")
  echo "Number of img tags: $count"
else
  echo "❌ No img tags found"
fi

echo -e "\nChecking for responsive breakpoints..."
if echo "$output" | grep -q "md:grid-cols-2"; then
  echo "✅ Found tablet responsive breakpoint (md:grid-cols-2)"
fi
if echo "$output" | grep -q "lg:grid-cols-3"; then
  echo "✅ Found desktop responsive breakpoint (lg:grid-cols-3)"
fi

