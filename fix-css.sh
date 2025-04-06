#!/bin/bash
cp src/app/globals.css src/app/globals.css.broken
cat src/app/globals.css.broken | grep -v "^\*/" > src/app/globals.css
echo "Fixed CSS file by removing orphaned comment closure."
