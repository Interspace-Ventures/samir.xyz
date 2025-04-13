#!/bin/bash
export PORT=5000
echo "Restarting static server..."
kill $(ps aux | grep static-server | grep -v grep | awk '{print $2}') 2>/dev/null || true
bun static-server.js &
echo "Server restarted"
