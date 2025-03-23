#!/bin/bash
# This script performs basic tests of the Next.js server

echo "============================================="
echo "Next.js Server Test Script"
echo "============================================="

echo "1. Checking if server is running on port 5000..."
if ss -tuln | grep -q ':5000 '; then
  echo "✓ Server is running on port 5000"
else
  echo "✗ No server detected on port 5000"
fi

echo "2. Attempting to fetch basic Next.js resources..."
echo "Fetching development manifest..."
curl -s -m 2 -o /dev/null -w "Status code: %{http_code}\n" "http://localhost:5000/_next/static/development/_buildManifest.js"

echo "Fetching homepage..."
curl -s -m 2 -o /dev/null -w "Status code: %{http_code}\n" "http://localhost:5000/"

echo "3. Checking process list for Next.js..."
ps aux | grep -v grep | grep "next"

echo "4. Looking at recent logs..."
tail -n 20 .next/logs/stdout.log 2>/dev/null || echo "No stdout.log found"

echo "============================================="
echo "Test complete"
echo "============================================="