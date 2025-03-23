#!/bin/bash
cd $(dirname $0)

echo "Starting Next.js application at port 5000..."
ps aux | grep next | grep -v grep | awk '{print $2}' | xargs -r kill -9
NODE_ENV=development bun run dev