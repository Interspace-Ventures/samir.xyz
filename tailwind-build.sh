#!/bin/bash
set -e # Exit on error

echo "Building Tailwind CSS..."
# Process the CSS with Tailwind
bun x tailwindcss -i ./app/tailwind.css -o ./public/tailwind.css