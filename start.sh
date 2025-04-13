#!/bin/bash

# Export port setting
export PORT=5000

# Start a simple HTTP server to serve the static content
exec bun static-server.js
