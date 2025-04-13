#!/bin/bash

# Export port setting
export PORT=5000

# Run the Remix application directly with bun
exec bun node_modules/@remix-run/dev/dist/cli.js dev --port 5000 --host 0.0.0.0
