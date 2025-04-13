#!/bin/bash

# Export port setting
export PORT=5000

# Run our simple static server instead of Next.js
exec bun run static-server.js
