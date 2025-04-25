#!/bin/bash

# Kill any existing Node.js processes
pkill -f node

# Start the Next.js app
cd ..
./start-nextjs.sh