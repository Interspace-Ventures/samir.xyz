#!/bin/bash

# Wrapper script for the actual start script
# This preserves backward compatibility while allowing us to refactor

# Execute the direct start script with no polyfills
exec ./start-direct.sh