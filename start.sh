#!/bin/bash

# Export port setting
export PORT=5000

# Run Next.js in the most compatible mode
exec bun --bun next dev -p $PORT --hostname 0.0.0.0
